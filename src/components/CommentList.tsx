import { useState, useEffect } from 'react';
import { getStory } from '../servises/newsApi';
import { CommentType } from '../utils/types';
import { Typography } from '@mui/material';
import { TreeItem, TreeView } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const removeTags = (text: string) => {
  const tempElement = document.createElement('div');
  tempElement.innerHTML = text;
  return tempElement.textContent || tempElement.innerText;
};

const CommentList = ({ commentId, nodeId = 0 }: { commentId?: number; nodeId?: number }) => {
  const [comment, setComment] = useState<CommentType>();
  let totalNodeId = nodeId;

  useEffect(() => {
    if (commentId) {
      getStory(commentId).then((result) => setComment(result));
    }
  }, [commentId]);

  if (nodeId) totalNodeId += 1;

  return comment?.text !== undefined && comment?.text !== '[dead]' ? (
    <>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ overflowY: 'auto' }}
      >
        <Typography sx={{ mt: 1, fontSize: '14px' }} color="text.secondary">
          {comment?.by} {comment?.time && new Date(1000 * comment?.time).toUTCString()}
        </Typography>
        <TreeItem nodeId={totalNodeId.toString()} label={comment?.text && removeTags(comment?.text)}>
          {comment?.kids &&
            comment?.kids.length !== 0 &&
            comment?.kids.map((childId: number) => (
              <CommentList key={childId} commentId={childId} nodeId={totalNodeId} />
            ))}
        </TreeItem>
      </TreeView>
      <br />
    </>
  ) : null;
};

export default CommentList;
