const Footer = () => {
  return (
    <div className="bg-slate-400 py-10">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-3xl text-slate-800  font-bold tracking-tighter ">
          Havenly
        </span>
        <span className="text-slate-900 font-bold tracking-tight flex gap-4">
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Terms of Service</p>
        </span>
      </div>
    </div>
  );
};

export default Footer;
