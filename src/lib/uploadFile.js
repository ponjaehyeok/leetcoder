import axios from "axios";

import GITHUB from "../config/github.js";

export async function uploadFile({ fileName, content, message }) {
  const url = `https://api.github.com/repos/${GITHUB.REPO}/contents/problems/${fileName}`;

  try {
    const { data } = await axios({
      url,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": "2022-11-28",
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${GITHUB.TOKEN}`,
      },
      data: JSON.stringify({
        branch: GITHUB.BRANCH,
        message,
        content: Buffer.from(content).toString("base64"),
      }),
    });

    return data.commit?.sha;
  } catch (error) {
    throw new Error(error);
  }
}
