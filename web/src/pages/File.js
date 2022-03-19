import React from "react";
import { useRouteMatch } from "react-router";
import useSwr from "swr";
import copyToClipboard from "../utils/copyToClipboard";
import prettyBytes from "../utils/prettyBytes";
import redableTime from "../utils/redableTime";

export default function File() {
  const match = useRouteMatch("/file/:fileId");
  const fileId = match ? match.params.fileId : "";
  const { data, error } = useSwr(`/api/file/${fileId}`, (url) => fetch(url).then((res) => res.json()));

  const copyStreamableLink = () => copyToClipboard(`${window.location.origin}/api/file/download/${fileId}`);

  if (!data && !error) return <div className="loading-div" />;
  if (error) return <h4 style={{ textAlign: "center", color: "red" }}>Cannot find the file</h4>;

  const { id, name, modifiedTime, iconLink, mimeType, size, hasThumbnail, thumbnailLink } = data;

  return (
    <div className="drive-file" id={id}>
      <div className="row items-center mt-1 mb-05">
        <h2 className="drive-item-title">{name}</h2>
      </div>
      <h4>Type: {mimeType}</h4>
      <h4>Size: {prettyBytes(size)}</h4>
      <div className="row flex-wrap space-evenly mt-1">
        <button onClick={copyStreamableLink}>
          <span className="btn-icon">
            <ion-icon name="play-outline" />
          </span>
          <span className="btn-text">Copy Stream Link</span>
        </button>
		<button onclick="location.href='intent:`${window.location.origin}/api/file/download/${fileId}`#Intent;package=com.brouken.player;S.title=${name};end';" onmouseout="outFunc()">
          <span className="btn-icon">
            <ion-icon name="play-outline" />
          </span>
          <span className="btn-text">Just (Video) Player</span>
        </button>
      </div>
    </div>
  );
}