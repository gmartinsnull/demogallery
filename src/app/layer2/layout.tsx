export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
        <div className="">
          <div className="w-full">Second layout</div>
          {children}
        </div>
    );
  }