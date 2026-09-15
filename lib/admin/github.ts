/**
 * Minimal GitHub Contents API client used only by the admin CMS write path.
 * Read-only Node.js `fetch`, no @octokit dependency — this is the whole
 * surface area we need (get file sha, create/update file, delete file).
 */

const GITHUB_API = "https://api.github.com";
const DEFAULT_REPO = "lutfuozturk4195-del/husca-digital";
const DEFAULT_BRANCH = "main";

function repoInfo() {
  const repo = process.env.CMS_GITHUB_REPO || DEFAULT_REPO;
  const branch = process.env.CMS_GITHUB_BRANCH || DEFAULT_BRANCH;
  const token = process.env.CMS_GITHUB_TOKEN;
  if (!token) {
    throw new Error(
      "CMS_GITHUB_TOKEN is not set — required to save posts when running on Vercel (the deployed filesystem is read-only, so writes go through GitHub instead)."
    );
  }
  return { repo, branch, token };
}

async function githubRequest(path: string, init: RequestInit): Promise<Response> {
  const { token } = repoInfo();
  return fetch(`${GITHUB_API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...init.headers,
    },
  });
}

async function readErrorBody(res: Response): Promise<string> {
  try {
    return await res.text();
  } catch {
    return "";
  }
}

/** Returns the file's current git blob sha, or null if it doesn't exist yet. */
export async function getFileSha(filePath: string): Promise<string | null> {
  const { repo, branch } = repoInfo();
  const res = await githubRequest(`/repos/${repo}/contents/${filePath}?ref=${branch}`, {
    method: "GET",
    cache: "no-store",
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`GitHub read failed (${res.status}): ${await readErrorBody(res)}`);
  }
  const data = (await res.json()) as { sha?: string };
  return data.sha ?? null;
}

/** Creates or updates a file with a single commit to the configured branch. */
export async function putFile(filePath: string, content: string, message: string): Promise<void> {
  const { repo, branch } = repoInfo();
  const sha = await getFileSha(filePath);

  const res = await githubRequest(`/repos/${repo}/contents/${filePath}`, {
    method: "PUT",
    body: JSON.stringify({
      message,
      content: Buffer.from(content, "utf8").toString("base64"),
      branch,
      ...(sha ? { sha } : {}),
    }),
  });

  if (!res.ok) {
    throw new Error(`GitHub write failed (${res.status}): ${await readErrorBody(res)}`);
  }
}

/** Deletes a file with a commit. No-ops if the file is already gone. */
export async function deleteFile(filePath: string, message: string): Promise<void> {
  const { repo, branch } = repoInfo();
  const sha = await getFileSha(filePath);
  if (!sha) return;

  const res = await githubRequest(`/repos/${repo}/contents/${filePath}`, {
    method: "DELETE",
    body: JSON.stringify({ message, sha, branch }),
  });

  if (!res.ok) {
    throw new Error(`GitHub delete failed (${res.status}): ${await readErrorBody(res)}`);
  }
}
