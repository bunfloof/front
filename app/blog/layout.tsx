export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="blog-selection hide-global-footer">{children}</div>;
}

