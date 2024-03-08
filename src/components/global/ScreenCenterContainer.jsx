function ScreenCenterContainer({ className = '', children }) {
  return <div className={'flex-center h-full ' + className}>{children}</div>;
}

export default ScreenCenterContainer;
