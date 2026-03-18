'use client';

import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiX, FiCalendar, FiMapPin } from 'react-icons/fi';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  createdAt: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/events');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date) return;

    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/events/${editingId}` : '/api/events';

    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setFormData({ title: '', description: '', date: '', location: '' });
      setEditingId(null);
      setModalOpen(false);
      fetchEvents();
    } catch (error) {
      console.error('Failed to save event:', error);
    }
  };

  const handleDelete = async () => {
    if (!selectedEvent) return;
    try {
      await fetch(`/api/events/${selectedEvent.id}`, { method: 'DELETE' });
      setDeleteConfirmOpen(false);
      setSelectedEvent(null);
      fetchEvents();
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  const handleEdit = (event: Event) => {
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      location: event.location,
    });
    setEditingId(event.id);
    setModalOpen(true);
  };

  const handleView = (event: Event) => {
    setSelectedEvent(event);
    setViewModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setFormData({ title: '', description: '', date: '', location: '' });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
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
              <div key={event.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden">
                <div className="p-6">
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
                    <p className="text-sm text-gray-600 line-clamp-2 mb-6">
                      {event.description}
                    </p>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleView(event)}
                      className="flex-1 flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded font-medium transition-colors"
                    >
                      <FiEye size={16} />
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(event)}
                      className="flex-1 flex items-center justify-center gap-2 bg-amber-50 hover:bg-amber-100 text-amber-600 px-3 py-2 rounded font-medium transition-colors"
                    >
                      <FiEdit2 size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setSelectedEvent(event);
                        setDeleteConfirmOpen(true);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded font-medium transition-colors"
                    >
                      <FiTrash2 size={16} />
                      Delete
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
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingId ? 'Edit Event' : 'Create New Event'}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Event Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Summer Conference 2024"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Description</label>
                <textarea
                  placeholder="Add details about your event..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Date & Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Location</label>
                  <input
                    type="text"
                    placeholder="e.g., New York, NY"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-colors"
                >
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
              <h2 className="text-2xl font-bold text-gray-900">{selectedEvent.title}</h2>
              <button
                onClick={() => setViewModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-600 mb-2">Date & Time</h4>
                <div className="flex items-center gap-2 text-gray-900">
                  <FiCalendar size={18} className="text-gray-400" />
                  <span>{formatDate(selectedEvent.date)}</span>
                </div>
              </div>

              {selectedEvent.location && (
                <div>
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Location</h4>
                  <div className="flex items-center gap-2 text-gray-900">
                    <FiMapPin size={18} className="text-gray-400" />
                    <span>{selectedEvent.location}</span>
                  </div>
                </div>
              )}

              {selectedEvent.description && (
                <div>
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Description</h4>
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedEvent.description}</p>
                </div>
              )}

              <div>
                <h4 className="text-sm font-medium text-gray-600 mb-2">Created</h4>
                <p className="text-gray-600 text-sm">{formatDate(selectedEvent.createdAt)}</p>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                <button
                  onClick={() => setViewModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full">
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Event</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete <span className="font-semibold text-gray-900">"{selectedEvent.title}"</span>? This action cannot be undone.
              </p>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setDeleteConfirmOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
