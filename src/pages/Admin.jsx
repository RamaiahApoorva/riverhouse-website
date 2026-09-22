import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

function ClassForm({ editingClass, onSave, onCancel }) {
  const [form, setForm] = useState(
    editingClass || { name: '', instructor: '', time: '', duration: '', level: 'All Levels', price: 0, description: '' }
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editingClass) {
      await supabase.from('classes').update(form).eq('id', editingClass.id)
    } else {
      await supabase.from('classes').insert(form)
    }
    onSave()
  }

  return (
    <form onSubmit={handleSubmit} className="bg-brown-800 rounded-2xl p-6 shadow-sm border border-brown-700 mb-8">
      <h3 className="font-sans text-xl text-brown-50 mb-4">{editingClass ? 'Edit Class' : 'Add New Class'}</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text" required placeholder="Class Name" value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="px-4 py-3 rounded-xl border border-brown-600 bg-brown-900 text-brown-50 focus:outline-none focus:ring-2 focus:ring-brown-500"
        />
        <input
          type="text" required placeholder="Instructor" value={form.instructor}
          onChange={(e) => setForm({ ...form, instructor: e.target.value })}
          className="px-4 py-3 rounded-xl border border-brown-600 bg-brown-900 text-brown-50 focus:outline-none focus:ring-2 focus:ring-brown-500"
        />
        <input
          type="text" required placeholder="Time (e.g. 6:00 AM)" value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
          className="px-4 py-3 rounded-xl border border-brown-600 bg-brown-900 text-brown-50 focus:outline-none focus:ring-2 focus:ring-brown-500"
        />
        <input
          type="text" required placeholder="Duration (e.g. 60 min)" value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
          className="px-4 py-3 rounded-xl border border-brown-600 bg-brown-900 text-brown-50 focus:outline-none focus:ring-2 focus:ring-brown-500"
        />
        <select
          value={form.level}
          onChange={(e) => setForm({ ...form, level: e.target.value })}
          className="px-4 py-3 rounded-xl border border-brown-600 bg-brown-900 text-brown-50 focus:outline-none focus:ring-2 focus:ring-brown-500"
        >
          <option>All Levels</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
        <input
          type="number" required placeholder="Price" value={form.price}
          onChange={(e) => setForm({ ...form, price: parseInt(e.target.value) || 0 })}
          className="px-4 py-3 rounded-xl border border-brown-600 bg-brown-900 text-brown-50 focus:outline-none focus:ring-2 focus:ring-brown-500"
        />
      </div>
      <textarea
        placeholder="Description" value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="w-full mt-4 px-4 py-3 rounded-xl border border-brown-600 bg-brown-900 text-brown-50 focus:outline-none focus:ring-2 focus:ring-brown-500"
        rows={2}
      />
      <div className="flex gap-3 mt-4">
        <button type="submit" className="bg-brown-500 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-brown-400 transition-colors">
          {editingClass ? 'Update' : 'Add Class'}
        </button>
        <button type="button" onClick={onCancel} className="border border-brown-600 text-brown-200 px-6 py-3 rounded-full text-sm font-medium hover:border-brown-400 transition-colors">
          Cancel
        </button>
      </div>
    </form>
  )
}

function ImageUploader({ imageKey, image, onUploaded }) {
  const [uploading, setUploading] = useState(false)
  const isVideo = imageKey === 'hero-video'

  const handleUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)

    const ext = file.name.split('.').pop()
    const filePath = `${imageKey}.${ext}`

    // Upload to storage (upsert by removing old file first)
    await supabase.storage.from('site-images').remove([filePath])
    const { error: uploadError } = await supabase.storage.from('site-images').upload(filePath, file)

    if (uploadError) {
      alert('Upload failed: ' + uploadError.message)
      setUploading(false)
      return
    }

    const { data: urlData } = supabase.storage.from('site-images').getPublicUrl(filePath)

    // Update the DB record with a cache-busting param
    const imageUrl = urlData.publicUrl + '?t=' + Date.now()
    await supabase.from('site_images').update({ image_url: imageUrl }).eq('key', imageKey)

    setUploading(false)
    onUploaded()
  }

  return (
    <div className="bg-brown-800 rounded-xl p-6 border border-brown-700">
      <h3 className="text-brown-50 font-medium mb-1 capitalize">{imageKey.replace('-', ' ')}</h3>
      <p className="text-brown-300 text-xs mb-4">{image?.alt_text}</p>
      {image?.image_url ? (
        isVideo ? (
          <video src={image.image_url} className="w-full h-48 object-cover rounded-xl mb-4" muted loop autoPlay playsInline />
        ) : (
          <img src={image.image_url} alt={image.alt_text} className="w-full h-48 object-cover rounded-xl mb-4" />
        )
      ) : (
        <div className="w-full h-48 rounded-xl bg-brown-900 flex items-center justify-center text-brown-400 text-sm mb-4">
          {isVideo ? 'No video uploaded' : 'No image uploaded'}
        </div>
      )}
      <label className={`inline-block cursor-pointer bg-brown-500 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-brown-400 transition-colors ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
        {uploading ? 'Uploading...' : image?.image_url ? `Replace ${isVideo ? 'Video' : 'Image'}` : `Upload ${isVideo ? 'Video' : 'Image'}`}
        <input type="file" accept={isVideo ? 'video/*' : 'image/*'} onChange={handleUpload} className="hidden" />
      </label>
    </div>
  )
}

export default function Admin() {
  const { user } = useAuth()
  const [tab, setTab] = useState('classes')
  const [classes, setClasses] = useState([])
  const [bookings, setBookings] = useState([])
  const [siteImages, setSiteImages] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingClass, setEditingClass] = useState(null)

  const fetchClasses = async () => {
    const { data } = await supabase.from('classes').select('*').order('id')
    setClasses(data || [])
  }

  const fetchBookings = async () => {
    const { data } = await supabase
      .from('bookings')
      .select('*, classes(name, instructor, time)')
      .order('created_at', { ascending: false })
    setBookings(data || [])
  }

  const fetchSiteImages = async () => {
    const { data } = await supabase.from('site_images').select('*').order('key')
    setSiteImages(data || [])
  }

  useEffect(() => {
    fetchClasses()
    fetchBookings()
    fetchSiteImages()
  }, [])

  const deleteClass = async (id) => {
    await supabase.from('classes').delete().eq('id', id)
    fetchClasses()
  }

  const handleSave = () => {
    setShowForm(false)
    setEditingClass(null)
    fetchClasses()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <section className="pt-32 pb-24 px-6 bg-gradient-to-b from-brown-800 to-brown-900 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <p className="text-brown-300 text-sm font-medium uppercase tracking-[0.2em] mb-4">Admin</p>
            <h1 className="font-sans text-4xl md:text-5xl text-brown-50 font-semibold">Dashboard</h1>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setTab('classes')}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                tab === 'classes' ? 'bg-brown-500 text-white' : 'bg-brown-800 text-brown-200 hover:bg-brown-700'
              }`}
            >
              Classes ({classes.length})
            </button>
            <button
              onClick={() => setTab('bookings')}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                tab === 'bookings' ? 'bg-brown-500 text-white' : 'bg-brown-800 text-brown-200 hover:bg-brown-700'
              }`}
            >
              Bookings ({bookings.length})
            </button>
            <button
              onClick={() => setTab('images')}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                tab === 'images' ? 'bg-brown-500 text-white' : 'bg-brown-800 text-brown-200 hover:bg-brown-700'
              }`}
            >
              Site Images
            </button>
          </div>

          {/* Classes Tab */}
          {tab === 'classes' && (
            <div>
              {!showForm && (
                <button
                  onClick={() => { setShowForm(true); setEditingClass(null) }}
                  className="mb-6 bg-brown-500 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-brown-400 transition-colors"
                >
                  + Add Class
                </button>
              )}

              {showForm && (
                <ClassForm
                  editingClass={editingClass}
                  onSave={handleSave}
                  onCancel={() => { setShowForm(false); setEditingClass(null) }}
                />
              )}

              <div className="grid gap-4">
                {classes.map((c) => (
                  <div key={c.id} className="bg-brown-800 rounded-xl p-6 border border-brown-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-brown-50 font-medium text-lg">{c.name}</h3>
                      <p className="text-brown-200 text-sm">{c.instructor} &middot; {c.time} &middot; {c.duration} &middot; {c.level}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-brown-50 font-semibold">${c.price}</span>
                      <button
                        onClick={() => { setEditingClass(c); setShowForm(true) }}
                        className="text-brown-300 text-sm font-medium hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteClass(c.id)}
                        className="text-red-400 text-sm font-medium hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bookings Tab */}
          {tab === 'bookings' && (
            <div className="grid gap-4">
              {bookings.length === 0 && (
                <p className="text-brown-300 text-center py-12">No bookings yet.</p>
              )}
              {bookings.map((b) => (
                <div key={b.id} className="bg-brown-800 rounded-xl p-6 border border-brown-700">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-brown-50 font-medium">{b.customer_name}</h3>
                      <p className="text-brown-200 text-sm">{b.customer_email}</p>
                      <p className="text-brown-300 text-sm mt-1">
                        {b.classes?.name} &middot; {b.classes?.instructor} &middot; {b.classes?.time}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-full ${
                        b.status === 'confirmed' ? 'bg-brown-700 text-brown-100' :
                        b.status === 'cancelled' ? 'bg-red-900/50 text-red-300' : 'bg-brown-700 text-brown-200'
                      }`}>
                        {b.status}
                      </span>
                      <span className={`text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-full ${
                        b.payment_status === 'paid' ? 'bg-green-900/50 text-green-300' :
                        b.payment_status === 'pending' ? 'bg-amber-900/50 text-amber-300' : 'bg-red-900/50 text-red-300'
                      }`}>
                        {b.payment_status}
                      </span>
                      <span className="text-brown-400 text-xs">{new Date(b.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Images Tab */}
          {tab === 'images' && (
            <div>
              <p className="text-brown-300 text-sm mb-6">Upload images and video for the homepage hero section. Changes appear immediately.</p>
              <div className="grid md:grid-cols-2 gap-6">
                {siteImages.map((img) => (
                  <ImageUploader key={img.key} imageKey={img.key} image={img} onUploaded={fetchSiteImages} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  )
}
