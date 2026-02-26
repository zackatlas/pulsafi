"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import WidgetClient from "./WidgetClient";

function WidgetInner() {
  const params = useSearchParams();
  const tool = params.get("tool") || "mortgage";
  const theme = params.get("theme") || "dark";
  return <WidgetClient tool={tool} theme={theme} />;
}

export default function WidgetPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, textAlign: "center", color: "#888" }}>Loading calculator...</div>}>
      <WidgetInner />
    </Suspense>
  );
}
