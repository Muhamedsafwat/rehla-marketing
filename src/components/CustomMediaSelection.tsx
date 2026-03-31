'use client'
import React, { useState, useEffect } from 'react'
import { useField } from '@payloadcms/ui'

interface MediaItem {
  id: string
  url: string
  filename: string
}

interface CustomMediaSelection {
  name?: string
  label?: string
  value?: string[] | string | null
  onChange?: (value: string[] | string | null) => void
  relationTo?: string
  hasMany?: boolean
}

const CustomMediaSelection: React.FC<CustomMediaSelection> = ({
  name = '',
  label = 'Select Image',
  onChange,
  relationTo = 'media',
  hasMany = true,
}) => {
  const { value, setValue } = useField({ hasRows: true })
  const [search, setSearch] = useState('')
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [activeImageId, setActiveImageId] = useState<string | null>(null)

  const handleClick = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds([])
      setValue(null)
      console.log('Selection cleared')
    } else {
      setSelectedIds([id])
      setValue(id)
      const selectedItem = mediaItems.find((item) => item.id === id)
      console.log('Selected image:', selectedItem)
    }
  }

  useEffect(() => {
    if (onChange) {
      onChange(selectedIds.length > 0 ? selectedIds[0] : null)
    }
  }, [selectedIds])

  useEffect(() => {
    async function fetchMedia() {
      try {
        setIsLoading(true)
        const res = await fetch(`/api/${relationTo}?limit=1000`)
        const data = await res.json()
        const items: MediaItem[] = data.docs || data

        setMediaItems(items)
        console.log('Fetched media items:', items)
      } catch (error) {
      } finally {
        setIsLoading(false)
      }
    }
    fetchMedia()
  }, [relationTo])

  useEffect(() => {
    // console.log("External value changed", value);

    if (value) {
      if (Array.isArray(value)) {
        setSelectedIds(value.length > 0 ? [value[0]] : [])
      } else if (typeof value === 'string') {
        setSelectedIds([value])
      } else {
        setSelectedIds([])
      }
    } else {
      setSelectedIds([])
    }
  }, [value])

  const filteredMedia = mediaItems.filter((item) =>
    item.filename.toLowerCase().includes(search.toLowerCase()),
  )

  const selectedIdsStr = selectedIds.map((id) => String(id))
  console.log(selectedIdsStr)

  if (isLoading) {
    return <div>Loading images...</div>
  }

  return (
    <div className="my-10" style={{ width: '100%', marginTop: '10px' }}>
      <label
        htmlFor={`searchInput-${name}`}
        style={{ display: 'block', marginBottom: 6, fontWeight: 'bold', fontSize: 14 }}
      >
        {label}
      </label>

      <input
        id={`searchInput-${name}`}
        type="text"
        placeholder="Search By Name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: '100%',
          marginBottom: 10,
          padding: 6,
          borderRadius: 4,
          border: '1px solid #ccc',
          boxSizing: 'border-box',
        }}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
          maxHeight: 400,
          overflowY: 'auto',
          padding: 10,
          border: '1px solid #ccc',
          borderRadius: 6,
        }}
      >
        {filteredMedia.map((item) => {
          const isSelected = selectedIdsStr.includes(String(item.id))
          return (
            <div
              key={item.id}
              style={{
                cursor: 'pointer',
                borderRadius: 8,
                padding: 6,
                border: '1px solid #ccc',
                boxShadow: isSelected ? '0 0 8px #0070f3' : 'none',
                transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                transition: 'all 0.2s ease',
                position: 'relative',
              }}
              onClick={() => {
                handleClick(item.id)
              }}
            >
              <img
                src={item.url}
                alt={item.filename}
                style={{
                  width: '100%',
                  height: 120,
                  objectFit: 'cover',
                  borderRadius: 4,
                  marginBottom: 6,
                  filter: isSelected ? 'brightness(1)' : 'brightness(0.9)',
                }}
              />
              <div style={{ fontSize: 12, textAlign: 'center' }}>{item.filename}</div>
              {isSelected && (
                <div
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    backgroundColor: '#0070f3',
                    color: 'white',
                    borderRadius: '50%',
                    width: 20,
                    height: 20,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                  }}
                >
                  ✓
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CustomMediaSelection
