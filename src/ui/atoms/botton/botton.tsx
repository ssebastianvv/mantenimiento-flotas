interface buttonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: any;
  name?: string;
  error?: string;
}

export const Button = ({
  type = "submit",
  name,
  error,
  ...props
}: buttonProps) => {    
  return (
    <button
      type={type}
      name={name}
      className={`px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600`}
      {...props}
    >
      {props.children}
    </button>
  );
};