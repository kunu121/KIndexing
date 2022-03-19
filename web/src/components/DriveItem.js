import React from "react";
import { Link } from "react-router-dom";
import prettyBytes from "../utils/prettyBytes";
import redableTime from "../utils/redableTime";
import copyToClipboard from "../utils/copyToClipboard";

function DriveItem({ id, name, modifiedTime, iconLink, mimeType, size }) {
  const isFolder = mimeType === "application/vnd.google-apps.folder";

  const onClickShare = () => {
    if (navigator.share) {
      navigator.share({
        title: name,
        url: `${window.location.origin}/${isFolder ? "share" : "file"}/${id}`
      });
    } else {
      copyToClipboard(`${window.location.origin}/${isFolder ? "share" : "file"}/${id}`);
    }
  };

  return (
    <div className="drive-item">
      <Link to={isFolder ? `/${id}` : `/file/${id}`} className="drive-item-main">
        <div className="row items-center">
          <img className="drive-item-icon" src={iconLink} alt={mimeType} />
          <h3 className="drive-item-title">{name}</h3>
        </div>
        <div className="drive-item-info">
          <div className="row flex-wrap space-between">
            {size && <h4>Size: {prettyBytes(size)}</h4>}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default DriveItem;
