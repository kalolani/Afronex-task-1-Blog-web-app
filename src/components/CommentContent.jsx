/* eslint-disable react/prop-types */
const ContentComment = ({ content }) => {
  return (
    <div
      className="px-40 text-base text-gray-700 mx-auto max-w-screen-md text-wrap"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default ContentComment;
