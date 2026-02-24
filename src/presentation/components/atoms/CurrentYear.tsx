"use client";

import { useMemo } from "react";

const CurrentYear: React.FC = () => {
  const year = useMemo(() => new Date().getFullYear(), []);

  return <span>{year}</span>;
};

export default CurrentYear;
