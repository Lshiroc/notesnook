/* This file is part of the Notesnook project (https://notesnook.com/)
 *
 * Copyright (C) 2022 Streetwriters (Private) Limited
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { useEffect, useState } from "react";
import { useAttachmentStore } from "../stores/use-attachment-store";

export const useAttachmentProgress = (attachment, encryption) => {
  const progress = useAttachmentStore((state) => state.progress);
  const [currentProgress, setCurrentProgress] = useState(
    encryption
      ? {
          type: "encrypt"
        }
      : null
  );

  useEffect(() => {
    let prog = progress[attachment.metadata.hash];
    if (prog) {
      let type = prog.type;
      let loaded = prog.type === "download" ? prog.recieved : prog.sent;
      prog = loaded / prog.total;
      prog = (prog * 100).toFixed(0);
      console.log("progress: ", prog);
      console.log(prog);
      setCurrentProgress({
        value: prog,
        percent: prog + "%",
        type: type
      });
    } else {
      setCurrentProgress(null);
    }
  }, [attachment.metadata.hash, progress]);

  return [currentProgress, setCurrentProgress];
};
