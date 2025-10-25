import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Edit3,
  Save,
  Eye,
  EyeOff,
  Calendar,
  Plus,
  Trash2,
  BarChart3,
} from "lucide-react";

interface AdminToolbarProps {
  isEditing?: boolean;
  isPublished?: boolean;
  onToggleEdit?: () => void;
  onSave?: () => void;
  onTogglePublish?: () => void;
  onSetEditedDate?: () => void;
  onDelete?: () => void;
  onViewAnalytics?: () => void;
}

export function AdminToolbar({
  isEditing = false,
  isPublished = true,
  onToggleEdit,
  onSave,
  onTogglePublish,
  onSetEditedDate,
  onDelete,
  onViewAnalytics,
}: AdminToolbarProps) {
  return (
    <div className="sticky top-0 z-50 bg-white/95 dark:bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Badge variant={isPublished ? "default" : "secondary"} className="font-noto">
              {isPublished ? "Published" : "Draft"}
            </Badge>
            <Badge variant="outline" className="font-noto text-xs">
              Admin Mode
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={isEditing ? "default" : "outline"}
              onClick={onToggleEdit}
              data-testid="button-toggle-edit"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              {isEditing ? "Editing" : "Edit"}
            </Button>

            {isEditing && (
              <Button
                size="sm"
                variant="default"
                onClick={onSave}
                data-testid="button-save"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            )}

            <Button
              size="sm"
              variant="outline"
              onClick={onTogglePublish}
              data-testid="button-toggle-publish"
            >
              {isPublished ? (
                <>
                  <EyeOff className="w-4 h-4 mr-2" />
                  Unpublish
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-2" />
                  Publish
                </>
              )}
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={onSetEditedDate}
              data-testid="button-set-date"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Set Date
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={onViewAnalytics}
              data-testid="button-analytics"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </Button>

            <div className="w-px h-6 bg-border" />

            <Button
              size="sm"
              variant="outline"
              onClick={onDelete}
              data-testid="button-delete"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
