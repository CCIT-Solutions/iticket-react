"use client";
import React, { useState, useCallback, useEffect, useId } from "react";
import { useDropzone } from "react-dropzone";
import { X, ImageIcon, Upload, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { useLang } from "@/hooks/useLang";

interface MultiImageUploadProps {
  maxImages?: number;
  maxSize?: number;
  disabled?: boolean;
  field: ControllerRenderProps<FieldValues, string>;
  /** Accessible label for the upload component */
  label?: string;
  /** ID of an element that labels the upload component */
  "aria-labelledby"?: string;
  /** ID of an element that describes the upload component */
  "aria-describedby"?: string;
  /** Additional description text for screen readers */
  description?: string;
}

const MultiImageUpload: React.FC<MultiImageUploadProps> = ({
  maxImages = 5,
  maxSize = 5 * 1024 * 1024,
  disabled = false,
  field,
  label,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  description,
}) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const { t } = useLang();

  // Generate unique IDs for accessibility
  const uploadId = useId();
  const descriptionId = useId();
  const errorId = useId();
  const statusId = useId();

  const images = field.value || [];
  const onImagesChange = field.onChange;

  // Generate previews when images change
  useEffect(() => {
    setPreviews([]); // Clear existing previews

    if (images.length === 0) return;

    const newPreviews: string[] = [];
    let loadedCount = 0;

    images.forEach((file: File, index: number) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          newPreviews[index] = e.target.result as string;
          loadedCount++;

          if (loadedCount === images.length) {
            setPreviews([...newPreviews]);
          }
        }
      };
      reader.onerror = () => {
        setErrors(prev => [...prev, `Failed to load preview for ${file.name}`]);
      };
      reader.readAsDataURL(file);
    });
  }, [images]);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      // Clear previous errors
      setErrors([]);
      
      // Handle rejected files
      if (rejectedFiles.length > 0) {
        const newErrors = rejectedFiles.map(({ file, errors }) => {
          if (errors.some((e: any) => e.code === 'file-too-large')) {
            return `${file.name} is too large. Maximum size is ${(maxSize / (1024 * 1024)).toFixed(2)}MB`;
          }
          if (errors.some((e: any) => e.code === 'file-invalid-type')) {
            return `${file.name} is not a supported image format`;
          }
          return `${file.name} could not be uploaded`;
        });
        setErrors(newErrors);
      }

      const remainingSlots = maxImages - images.length;
      const filesToAdd = acceptedFiles.slice(0, remainingSlots);

      if (acceptedFiles.length > remainingSlots) {
        setErrors(prev => [...prev, `Only ${remainingSlots} more images can be added`]);
      }

      if (filesToAdd.length > 0) {
        const newImages = [...images, ...filesToAdd];
        onImagesChange(newImages);
      }
    },
    [images, maxImages, maxSize, onImagesChange]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
      },
      maxSize,
      multiple: true,
      disabled: disabled || images.length >= maxImages,
    });

  const removeImage = (index: number) => {
    const newImages = images.filter((_: File, i: number) => i !== index);
    onImagesChange?.(newImages);
    
    // Announce removal to screen readers
    const removedFile = images[index];
    if (removedFile) {
      // You could also use a live region for this announcement
      console.log(`Removed image: ${removedFile.name}`);
    }
  };

  const formatFileSize = (bytes: number) => {
    return (bytes / (1024 * 1024)).toFixed(2);
  };

  const getDropzoneClasses = () => {
    let classes =
      "border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 cursor-pointer focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 ";

    if (disabled || images.length >= maxImages) {
      classes += "border-gray-200 bg-gray-50 cursor-not-allowed ";
    } else if (isDragReject) {
      classes += "border-red-500 bg-red-50 ";
    } else if (isDragActive) {
      classes += "border-blue-500 bg-blue-50 ";
    } else {
      classes +=
        "border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50 ";
    }

    return classes;
  };

  const getStatusMessage = () => {
    if (disabled) return "Upload is disabled";
    if (images.length >= maxImages) return `Maximum of ${maxImages} images reached`;
    if (isDragActive) {
      return isDragReject ? "Some files are not supported" : "Drop files here";
    }
    return `${images.length} of ${maxImages} images uploaded`;
  };

  const getAriaDescribedBy = () => {
    const ids = [];
    if (ariaDescribedBy) ids.push(ariaDescribedBy);
    if (description) ids.push(descriptionId);
    ids.push(statusId);
    if (errors.length > 0) ids.push(errorId);
    return ids.join(' ');
  };

  return (
    <div className="space-y-4">
      {/* Hidden label for screen readers if no visible label provided */}
      {label && (
        <label htmlFor={uploadId} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      {/* Description for screen readers */}
      {description && (
        <div id={descriptionId} className="text-sm text-gray-600 mb-2">
          {description}
        </div>
      )}

      {/* Live region for status updates */}
      <div id={statusId} className="sr-only" aria-live="polite" aria-atomic="true">
        {getStatusMessage()}
      </div>

      {/* Error messages */}
      {errors.length > 0 && (
        <div id={errorId} className="space-y-1" role="alert" aria-live="polite">
          {errors.map((error, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-2 rounded-md">
              <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              <span>{error}</span>
            </div>
          ))}
        </div>
      )}

      {/* Upload Area */}
      {images.length < maxImages && !disabled && (
        <div {...getRootProps()} className={getDropzoneClasses()}>
          <input
            {...getInputProps()}
            id={uploadId}
            aria-label={
              label || 
              `Upload images, ${images.length} of ${maxImages} uploaded. Supported formats: JPEG, PNG, GIF, WebP. Maximum size: ${(maxSize / (1024 * 1024)).toFixed(2)}MB per file.`
            }
            aria-labelledby={ariaLabelledBy}
            aria-describedby={getAriaDescribedBy()}
            aria-invalid={errors.length > 0}
          />
          <div className="space-y-4">
            <div className="w-6 h-6 text-neutral-500 mx-auto relative">
              {/* Using Upload icon instead of external image for better accessibility */}
              <Image src={"/media/icons/image.webp"} alt="" className="w-full h-full object-cover" fill/>
            </div>
            <div>
              <p className="text-neutral-600 mb-1">
                {isDragActive
                  ? isDragReject
                    ? t("upload.unsupported")
                    : t("upload.dropHere")
                  : t("upload.clickToUpload")}
              </p>
              <p className="text-xs text-neutral-500">
                {t("upload.formats", {
                  maxSize: (maxSize / 1000000).toFixed(2),
                })}
              </p>
              <p className="text-xs text-neutral-500 mt-1">
                {images.length}/{maxImages} {t("upload.imagesUploaded")}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Image Previews */}
      {images.length > 0 && (
        <div 
          className="grid grid-cols-2 gap-4"
          role="list"
          aria-label="Uploaded images"
        >
          {images.map((file: File, index: number) => (
            <div 
              key={`${file.name}-${index}`} 
              className="relative group"
              role="listitem"
            >
              <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
                {previews[index] ? (
                  <div className="relative w-full">
                    <Image
                      src={previews[index]}
                      alt={`Preview of ${file.name}`}
                      width={200}
                      height={130}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                ) : (
                  <div 
                    className="flex items-center justify-center h-40 bg-gray-100"
                    role="img"
                    aria-label={`Loading preview for ${file.name}`}
                  >
                    <ImageIcon className="w-8 h-8 text-gray-400" aria-hidden="true" />
                  </div>
                )}

                <div className="p-2">
                  <p className="text-xs font-medium truncate" title={file.name}>
                    {file.name}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {formatFileSize(file.size)} {t("upload.mb")}
                  </p>
                </div>
              </div>

              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
                onClick={() => removeImage(index)}
                disabled={disabled}
                aria-label={`Remove ${file.name} from upload`}
              >
                <X className="w-3 h-3" aria-hidden="true" />
                <span className="sr-only">Remove image</span>
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Max images reached message */}
      {images.length >= maxImages && !disabled && (
        <div 
          className="text-sm text-red-400 bg-custom-grey-200 p-3 rounded-md border border-custom-grey-100"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            <span>
              {t("upload.maxNumberReach")} ({maxImages}/{maxImages})
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiImageUpload;