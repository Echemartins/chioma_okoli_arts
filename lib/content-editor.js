import { verifyToken } from "./auth.js";
import { requestToken, allowedEditor } from "./admin-session.js";
export function isContentEditor(req) {
  try {
    const user = verifyToken(requestToken(req));
    return allowedEditor(user.email,process.env.CONTENT_EDITOR_EMAILS);
  } catch { return false; }
}
