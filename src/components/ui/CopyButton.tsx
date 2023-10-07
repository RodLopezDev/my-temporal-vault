"use client";

import { IconButton, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { FC, useState } from "react";

interface Props {
  value: string;
}

const CopyButton: FC<Props> = ({ value }) => {
  const initialTooltip = "Copy to clipboard";
  const [tooltip, setTooltip] = useState(initialTooltip);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setTooltip("Copied!");
    } catch (error) {
      setTooltip("Failed to copy");
    }
  };
  const onMouseLeave = () => {
    setTooltip(initialTooltip);
  };

  return (
    <Tooltip title={tooltip}>
      <IconButton onClick={copyToClipboard} onMouseLeave={onMouseLeave}>
        <ContentCopyIcon />
      </IconButton>
    </Tooltip>
  );
};

export default CopyButton;
