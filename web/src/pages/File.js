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
  var urlvideo = `${window.location.origin}/api/file/download/${fileId}`;

  if (!data && !error) return <div className="loading-div" />;
  if (error) return <h4 style={{ textAlign: "center", color: "red" }}>Cannot find the file</h4>;

  const { id, name, modifiedTime, iconLink, mimeType, size, hasThumbnail, thumbnailLink } = data;

  return (
    <div className="drive-file" id={id}>
      <div className="row items-center mt-1 mb-05">
        <h4 className="drive-item-title">{name}</h4>
      </div>
      <h4>Size: {prettyBytes(size)}</h4>
	  <br>
      <div className="row flex-wrap space-evenly mt-1">
        <a href="potplayer://${urlvideo}" className="button primary">
          <span className="btn-icon">
            <ion-icon name="play-outline" />
          </span>
          <span className="btn-text">Pot Player</span>
        </a>
        <button onClick={copyStreamableLink}>
          <span className="btn-icon">
            <ion-icon name="play-outline" />
          </span>
          <span className="btn-text">Copy Link</span>
        </button>
      </div>
    </div>
  );
}
