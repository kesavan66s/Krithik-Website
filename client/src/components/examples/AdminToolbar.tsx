import { AdminToolbar } from "../AdminToolbar";
import { useState } from "react";

export default function AdminToolbarExample() {
  const [isEditing, setIsEditing] = useState(false);
  const [isPublished, setIsPublished] = useState(true);

  return (
    <div className="min-h-[300px]">
      <AdminToolbar
        isEditing={isEditing}
        isPublished={isPublished}
        onToggleEdit={() => {
          setIsEditing(!isEditing);
          console.log("Toggle edit mode");
        }}
        onSave={() => console.log("Save changes")}
        onTogglePublish={() => {
          setIsPublished(!isPublished);
          console.log("Toggle publish status");
        }}
        onSetEditedDate={() => console.log("Set edited date")}
        onDelete={() => console.log("Delete page")}
        onViewAnalytics={() => console.log("View analytics")}
      />
      <div className="p-8">
        <p className="font-noto text-muted-foreground text-center">
          Admin toolbar is fixed at the top. Try the buttons to see console logs.
        </p>
      </div>
    </div>
  );
}
