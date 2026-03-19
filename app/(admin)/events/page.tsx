'use client';

import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiX, FiCalendar, FiMapPin, FiAlertCircle } from 'react-icons/fi';

const PAGES = ['makerspace', 'artcafe', 'cowork', 'podlab', 'loft', 'rooftop'] as const;
type PageType = typeof PAGES[number];

interface Event {
  _id: string;          // ← fixed: MongoDB uses _id
  title: string;
  description: string;
  date: string;
  month: string;        // ← added: your EventsSection needs this
  location: string;
  page: PageType;       // ← added: which section this event belongs to
  href: string;         // ← added: link for the event card
  createdAt: string;
}

interface FormData {
  title: string;
  description: string;
  date: string;
  month: string;
  location: string;
  page: PageType;
  href: string;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const defaultForm: FormData = {
  title: '',
  description: '',
  date: '',
  month: '',
  location: '',
  page: 'makerspace',
  href: '',
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);       // ← added: loading state for form
  const [error, setError] = useState<string | null>(null); // ← added: error state
  const [filterPage, setFilterPage] = useState<PageType | 'all'>('all'); // ← added: filter by page
  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState<FormData>(defaultForm);
  const [formError, setFormError] = useState<string | null>(null); // ← added: form-level error

  useEffect(() => {
    fetchEvents();
  }, [filterPage]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const url = filterPage === 'all' ? '/api/events' : `/api/events?page=${filterPage}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
      const data = await response.json();
      setEvents(data);
    } catch (err) {
      setError('Failed to load events. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Auto-derive month from date input
  const handleDateChange = (dateStr: string) => {
    const month = dateStr ? MONTHS[new Date(dateStr).getMonth()] : '';
    setFormData((prev) => ({ ...prev, date: dateStr, month }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Client-side validation
    if (!formData.title.trim()) return setFormError('Title is required.');
    if (!formData.date) return setFormError('Date is required.');
    if (!formData.page) return setFormError('Page is required.');
    if (formData.href && !formData.href.startsWith('/'))
      return setFormError('Link must start with / (e.g. /events/my-event)');

    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/events/${editingId}` : '/api/events';

    try {
      setSaving(true);
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || 'Failed to save event');
      }

      closeModal();
      fetchEvents();
    } catch (err: any) {
      setFormError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedEvent) return;
    try {
      // Optimistic update — remove from UI immediately
      setEvents((prev) => prev.filter((e) => e._id !== selectedEvent._id));
      setDeleteConfirmOpen(false);

      const res = await fetch(`/api/events/${selectedEvent._id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');

      setSelectedEvent(null);
    } catch (err) {
      // Rollback on failure
      fetchEvents();
      setError('Failed to delete event. Please try again.');
    }
  };

  const handleEdit = (event: Event) => {
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      month: event.month,
      location: event.location,
      page: event.page,
      href: event.href,
    });
    setEditingId(event._id);   // ← fixed: was event.id
    setModalOpen(true);
  };

  const handleView = (event: Event) => {
    setSelectedEvent(event);
    setViewModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setFormData(defaultForm);
    setFormError(null);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const accentColors: Record<PageType, string> = {
    makerspace: 'bg-purple-100 text-purple-700',
    artcafe: 'bg-amber-100 text-amber-700',
    cowork: 'bg-blue-100 text-blue-700',
    podlab: 'bg-pink-100 text-pink-700',
    loft: 'bg-yellow-100 text-yellow-700',
    rooftop: 'bg-green-100 text-green-700',

  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Events</h1>
            <p className="text-gray-600 mt-1">Manage your upcoming events</p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors w-full md:w-auto"
          >
            <FiPlus size={20} />
            New Event
          </button>
        </div>

        {/* Global Error Banner */}
        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            <FiAlertCircle size={18} className="flex-shrink-0" />
            <span>{error}</span>
            <button onClick={() => setError(null)} className="ml-auto">
              <FiX size={16} />
            </button>
          </div>
        )}

        {/* Page Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(['all', ...PAGES] as const).map((p) => (
            <button
              key={p}
              onClick={() => setFilterPage(p)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${filterPage === p
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        {events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center bg-white rounded-lg shadow">
            <FiCalendar size={48} className="text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600">No events yet</h3>
            <p className="text-gray-500 mt-2">Create your first event to get started</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div key={event._id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden">
                <div className="p-6">
                  {/* Page badge */}
                  <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full capitalize mb-3 ${accentColors[event.page]}`}>
                    {event.page}
                  </span>

                  <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-4">
                    {event.title}
                  </h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <FiCalendar size={16} className="mt-0.5 flex-shrink-0 text-gray-400" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    {event.location && (
                      <div className="flex items-start gap-2 text-sm text-gray-600">
                        <FiMapPin size={16} className="mt-0.5 flex-shrink-0 text-gray-400" />
                        <span className="line-clamp-2">{event.location}</span>
                      </div>
                    )}
                  </div>

                  {event.description && (
                    <p className="text-sm text-gray-600 line-clamp-2 mb-6">{event.description}</p>
                  )}

                  <div className="flex gap-2">
                    <button onClick={() => handleView(event)} className="flex-1 flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded font-medium transition-colors">
                      <FiEye size={16} /> View
                    </button>
                    <button onClick={() => handleEdit(event)} className="flex-1 flex items-center justify-center gap-2 bg-amber-50 hover:bg-amber-100 text-amber-600 px-3 py-2 rounded font-medium transition-colors">
                      <FiEdit2 size={16} /> Edit
                    </button>
                    <button
                      onClick={() => { setSelectedEvent(event); setDeleteConfirmOpen(true); }}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded font-medium transition-colors"
                    >
                      <FiTrash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingId ? 'Edit Event' : 'Create New Event'}
              </h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <FiX size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Form Error */}
              {formError && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  <FiAlertCircle size={16} />
                  {formError}
                </div>
              )}

              {/* Page selector */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Page <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.page}
                  onChange={(e) => setFormData({ ...formData, page: e.target.value as PageType })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none capitalize"
                >
                  {PAGES.map((p) => (
                    <option key={p} value={p} className="capitalize">{p}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Event Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Photography Workshop"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Description</label>
                <textarea
                  placeholder="Add details about your event..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Date & Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.date}
                    onChange={(e) => handleDateChange(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  {/* Show auto-derived month */}
                  {formData.month && (
                    <p className="text-xs text-gray-500 mt-1">Month: <strong>{formData.month}</strong> (auto-set)</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Location</label>
                  <input
                    type="text"
                    placeholder="e.g., Sattya Media Arts Collective"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Event Link <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="/events/my-event-slug"
                  value={formData.href}
                  onChange={(e) => setFormData({ ...formData, href: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-sm"
                />
                <p className="text-xs text-gray-400 mt-1">Must start with / if provided</p>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                <button type="button" onClick={closeModal} className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  {saving && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />}
                  {editingId ? 'Update Event' : 'Create Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <div>
                <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full capitalize mb-2 ${accentColors[selectedEvent.page]}`}>
                  {selectedEvent.page}
                </span>
                <h2 className="text-2xl font-bold text-gray-900">{selectedEvent.title}</h2>
              </div>
              <button onClick={() => setViewModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <FiX size={24} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Date & Time</h4>
                  <div className="flex items-center gap-2 text-gray-900">
                    <FiCalendar size={16} className="text-gray-400" />
                    <span>{formatDate(selectedEvent.date)}</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Month (for card)</h4>
                  <span className="text-gray-900 font-mono">{selectedEvent.month}</span>
                </div>
              </div>

              {selectedEvent.location && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Location</h4>
                  <div className="flex items-center gap-2 text-gray-900">
                    <FiMapPin size={16} className="text-gray-400" />
                    <span>{selectedEvent.location}</span>
                  </div>
                </div>
              )}

              {selectedEvent.description && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Description</h4>
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedEvent.description}</p>
                </div>
              )}

              {selectedEvent.href && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Link</h4>
                  <span className="text-gray-700 font-mono text-sm">{selectedEvent.href}</span>
                </div>
              )}

              <div>
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Created</h4>
                <p className="text-gray-500 text-sm">{formatDate(selectedEvent.createdAt)}</p>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                <button onClick={() => setViewModalOpen(false)} className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">
                  Close
                </button>
                <button
                  onClick={() => { setViewModalOpen(false); handleEdit(selectedEvent); }}
                  className="px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <FiEdit2 size={16} /> Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirmOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Event</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{' '}
              <span className="font-semibold text-gray-900">"{selectedEvent.title}"</span>?
              This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteConfirmOpen(false)} className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">
                Cancel
              </button>
              <button onClick={handleDelete} className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}