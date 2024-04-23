/* eslint-disable react/prop-types */
const MyComponent = ({ htmlContent }) => {
  return (
    <div
      style={{ color: "inherit" }}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      className="px-40 phone:px-6 p-tab:px-10 tablet:px-20 laptop:px-40 text-xl bigdesktop:text-3xl text-inherit"
    />
  );
};

export default MyComponent;
