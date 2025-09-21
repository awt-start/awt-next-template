import { ReactNode } from "react";

interface AuthDemoLayoutProps {
  children: ReactNode;
}

export default function AuthDemoLayout({ children }: AuthDemoLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">认证功能演示</h1>
            <div className="text-sm text-muted-foreground">
              Ruoyi-Plus 认证集成
            </div>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}