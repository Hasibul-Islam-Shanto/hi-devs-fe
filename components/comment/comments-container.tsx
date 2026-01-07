import { IComment } from '@/types/comment';
import Comment from './comment';

const CommentsContainer = ({ comments }: { comments: IComment[] }) => {
  return (
    <>
      {comments.map(comment => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </>
  );
};

export default CommentsContainer;
