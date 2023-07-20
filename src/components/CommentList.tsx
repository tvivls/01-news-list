import { CommentType } from '../utils/types';
import { Box, Typography } from '@mui/material';
import { TreeItem, TreeView } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import useStory from '../hooks/useStory';

const removeTags = (text: string) => {
  const tempElement = document.createElement('div');
  tempElement.innerHTML = text;
  return tempElement.textContent || tempElement.innerText;
};

const CommentList = ({ id, nodeId = 0 }: { id?: number; nodeId?: number }) => {
  if (!id) return null;
  const { data, isError, isLoading } = useStory<CommentType>(id);
  const date = data?.time ? new Date(1000 * data?.time).toUTCString() : '';
  let totalNodeId = nodeId;

  if (isError) return <Typography>failed to load</Typography>;
  if (isLoading) return <Typography>loading...</Typography>;

  if (nodeId) totalNodeId += 1;

  return data?.text !== undefined && data?.text !== '[dead]' ? (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <Typography sx={{ mt: 1, fontSize: '14px' }} color="text.secondary">
        {data?.by} {date}
      </Typography>
      <TreeItem nodeId={totalNodeId.toString()} label={data?.text && removeTags(data?.text)}>
        {data?.kids &&
          data?.kids.length !== 0 &&
          data?.kids.map((commentId: number) => <CommentList key={commentId} id={commentId} nodeId={totalNodeId} />)}
      </TreeItem>
      <Box mb={2} />
    </TreeView>
  ) : null;
};

export default CommentList;
