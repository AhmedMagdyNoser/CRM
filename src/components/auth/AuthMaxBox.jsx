import React from 'react';
import ScreenCenterContainer from '../global/ScreenCenterContainer';
import { Link } from 'react-router-dom';
import defaultImage from '../../assets/defaultImage.svg';

/**
 * `AuthMaxBox` is a component that presents an image, a title, and its children in a centered box on the screen.
 * It can optionally display a link that redirects to a different page when clicked.
 *
 * The component is divided into two main sections:
 * 1. The first section is for an image, which is displayed on large screens only.
 * 2. The second section is for the title, the child elements, and an optional leave link.
 *
 * The component is styled as a white flex container and its children are stacked horizontally.
 * On mobile devices, it takes the full height and width and a small padding.
 * From small screens and up, it adjusts its height and width to fit its content, applies rounded corners, increases the padding, and adds a shadow. So it looks like a card.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.image - The URL of the image to be displayed. If not provided, a default image is used.
 * @param {string} props.title - The title to be displayed above the child elements. If not provided, the title is not displayed.
 * @param {Object} props.leave - An object with `hint`, `link`, and `label` properties for the leave link. If not provided, the leave link is not displayed.
 * @param {ReactNode} props.children - The child elements to be rendered inside the box.
 * @returns {ReactElement} A `ScreenCenterContainer` element that wraps a div, which in turn wraps the image, the title, the child elements, and an optional leave link.
 */

function AuthMaxBox({ className = '', image = defaultImage, title, leave, children }) {
  return (
    <ScreenCenterContainer>
      <div className={'auth-box ' + className}>
        <section className="xl:flex-center hidden w-[500px] p-12">
          <img src={image} alt={title} className="w-[85%]" />
        </section>
        <div className="m-12 hidden w-[1px] rounded bg-progray-100 xl:flex">{/* Divider */}</div>
        <section className="flex flex-1 flex-col gap-3">
          {title && <h1 className="mb-2">{title}</h1>}
          {children}
          {leave && (
            <div className="flex flex-wrap justify-center gap-1">
              {leave.hint && <span className="text-progray-300">{leave.hint}</span>}
              <Link className="font-bold text-pro-200 transition-colors hover:text-pro-300" to={leave.link}>
                {leave.label}
              </Link>
            </div>
          )}
        </section>
      </div>
    </ScreenCenterContainer>
  );
}

export default AuthMaxBox;
