/* eslint-disable react/prop-types */
const MyComponent = ({ htmlContent }) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default MyComponent;
