"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const MobileNavigationButton = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const onMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onMenuToggle}
      className="lg:hidden"
      aria-label="Toggle menu"
    >
      {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </Button>
  );
};

export default MobileNavigationButton;
