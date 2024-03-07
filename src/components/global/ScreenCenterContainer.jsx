function ScreenCenterContainer({ className = '', children }) {
  return <div className={'flex-center h-screen bg-progray-100 ' + className}>{children}</div>;
}

export default ScreenCenterContainer;
