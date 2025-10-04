"use client"

import * as React from "react"
import Image from "next/image"
import { useUploadThing } from "@/app/lib/uploadthing"
import { Button } from "@/components/ui/button"

type Props = {
  value?: string | null
  onChange: (url: string | null) => void
}

export default function ThumbnailUploader({ value, onChange }: Props) {
  const [preview, setPreview] = React.useState<string | null>(value ?? null)
  const { startUpload, isUploading } = useUploadThing("thumbnail")

  const handleSelect = async (file: File) => {
    const res = await startUpload([file])
    const url = res?.[0]?.serverData?.url ?? res?.[0]?.url // both are common returns
    if (url) {
      setPreview(url)
      onChange(url)
    }
  }

  const onFileInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const f = e.target.files?.[0]
    if (f) void handleSelect(f)
  }

  const clear = () => {
    setPreview(null)
    onChange(null)
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <input
          type="file"
          accept="image/*"
          onChange={onFileInput}
          disabled={isUploading}
        />
        {preview && (
          <Button type="button" variant="secondary" onClick={clear}>
            Remove
          </Button>
        )}
      </div>

      {isUploading && <p className="text-sm text-muted-foreground">Uploading…</p>}

      {preview && (
        <div className="relative h-40 w-40 overflow-hidden rounded-md border">
          {/* Avoid layout shift with fixed size; adjust as you like */}
          <Image
            src={preview}
            alt="Thumbnail preview"
            fill
            className="object-cover"
            sizes="160px"
          />
        </div>
      )}
    </div>
  )
}
