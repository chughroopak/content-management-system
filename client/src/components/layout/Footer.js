import React from "react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white p-4 text-center">
      Copyright &copy; {new Date().getFullYear()} Content Management System
    </footer>
  );
}
