import PropTypes from "prop-types";

export const Container = (props) => {
  const { className, children } = props;
  return (
    <div
      className={`container p-8 mx-auto xl:px-0 ${className ? className : ""}`}
    >
      {children}
    </div>
  );
};

Container.propTypes = {
  props: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.elementType,
};
