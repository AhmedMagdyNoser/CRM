function ScreenCenterContainer({ className = '', children }) {
  return <div className={'flex-center h-screen bg-progray-50 ' + className}>{children}</div>;
}

export default ScreenCenterContainer;
