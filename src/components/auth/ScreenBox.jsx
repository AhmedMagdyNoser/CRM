/**
 * ScreenBox is a flex box that centers its children on the screen.
 * It applies a fade-in animation and a background color.
 * On mobile devices, it takes up the full height of the screen.
 * From small screens and up, it adjusts its height and width to fit its content.
 *
 * @param {string} props.className Additional CSS classes to apply to the inner div.
 * @param {ReactNode} props.children The child elements to be rendered inside the ScreenBox.
 * @returns {ReactElement} A div element that wraps the child elements.
 */

function ScreenBox({ className, children }) {
  return (
    <div className="flex-center h-screen bg-progray-50">
      <div
        className={
          'flex h-full w-full animate-fade-in-fast bg-white sm:h-fit sm:w-fit sm:rounded-xl sm:shadow-lg ' + className
        }
      >
        {children}
      </div>
    </div>
  );
}

export default ScreenBox;
