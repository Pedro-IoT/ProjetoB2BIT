export const IconeEmail = () => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z"
        stroke="#62748E"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9"
        stroke="#62748E"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

interface IconeProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
}

export const IconeSenha = ({ className, ...props }: IconeProps) => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.58 11.9999C15.58 13.9799 13.98 15.5799 12 15.5799C10.02 15.5799 8.41998 13.9799 8.41998 11.9999C8.41998 10.0199 10.02 8.41992 12 8.41992C13.98 8.41992 15.58 10.0199 15.58 11.9999Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 20.27C15.53 20.27 18.82 18.19 21.11 14.59C22.01 13.18 22.01 10.81 21.11 9.39997C18.82 5.79997 15.53 3.71997 12 3.71997C8.47003 3.71997 5.18003 5.79997 2.89003 9.39997C1.99003 10.81 1.99003 13.18 2.89003 14.59C5.18003 18.19 8.47003 20.27 12 20.27Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const IconeSenhaFechada = ({ className, ...props }: IconeProps) => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.58 11.9999C15.58 13.9799 13.98 15.5799 12 15.5799C10.02 15.5799 8.41998 13.9799 8.41998 11.9999C8.41998 10.0199 10.02 8.41992 12 8.41992C13.98 8.41992 15.58 10.0199 15.58 11.9999Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 20.27C15.53 20.27 18.82 18.19 21.11 14.59C22.01 13.18 22.01 10.81 21.11 9.39997C18.82 5.79997 15.53 3.71997 12 3.71997C8.47003 3.71997 5.18003 5.79997 2.89003 9.39997C1.99003 10.81 1.99003 13.18 2.89003 14.59C5.18003 18.19 8.47003 20.27 12 20.27Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 2 L22 22"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  );
};

export const IconeNome = () => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.1601 10.87C12.0601 10.86 11.9401 10.86 11.8301 10.87C9.45006 10.79 7.56006 8.84 7.56006 6.44C7.56006 3.99 9.54006 2 12.0001 2C14.4501 2 16.4401 3.99 16.4401 6.44C16.4301 8.84 14.5401 10.79 12.1601 10.87Z"
        stroke="#62748E"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.15997 14.56C4.73997 16.18 4.73997 18.82 7.15997 20.43C9.90997 22.27 14.42 22.27 17.17 20.43C19.59 18.81 19.59 16.17 17.17 14.56C14.43 12.73 9.91997 12.73 7.15997 14.56Z"
        stroke="#62748E"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const IconeSol = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-sun-icon lucide-sun"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
};

export const IconeLua = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-moon-icon lucide-moon"
    >
      <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
    </svg>
  );
};
