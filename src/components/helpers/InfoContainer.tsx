type Props = {
  children: React.ReactNode;
};

export const InfoContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className="w-auto h-auto bg-slate-300 rounded-lg shadow-md flex flex-col items-center px-5 py-4 gap-3">
      {children}
    </div>
  );
};
