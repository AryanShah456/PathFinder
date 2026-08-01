// supabase-config.js
// Centralized Supabase configuration for PathFinder
// Must be included FIRST in every HTML file, after Supabase SDK

(function () {
  'use strict';

  // ============================================
  // SUPABASE CONFIGURATION — UPDATE THESE
  // ============================================
  // IMPORTANT: this must be your Supabase "anon" / "public" key from
  // Project Settings -> API. It is a long JWT that starts with "eyJ...".
  // Never put a Resend API key, a Supabase "service_role" key, or any other
  // secret key here — this file is sent to every visitor's browser.
  const SUPABASE_URL = 'https://bfdtrmsubxczvkepluhv.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable_VvsH13MXkoZmwMKOStsNWg_Vpvr_DTo';

  // Initialize Supabase client
  window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  window.supabase = supabaseClient;

  // Shortcuts
  window.db = supabaseClient;        // for queries
  window.auth = supabaseClient.auth; // for auth

  // ---------- Safe DOM helpers (prevent XSS) ----------
  window.safeText = function (elementId, text) {
    const el = document.getElementById(elementId);
    if (el) el.textContent = text || '';
  };

  window.safeHTML = function (elementId, html) {
    const el = document.getElementById(elementId);
    if (el) el.innerHTML = html;
  };

  window.escapeHTML = function (str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  window.normalizeSearchKey = function (str) {
    return (str || '').toString().trim().toLowerCase();
  };

  // ---------- Auth guard ----------
  window.requireAuth = async function (callback, allowIncompleteProfile) {
    const { data: { session }, error } = await auth.getSession();

    if (error || !session) {
      window.location.href = 'login.html';
      return;
    }

    const user = session.user;

    if (allowIncompleteProfile) {
      if (callback) callback(user);
      return;
    }

    // Check if profile is complete
    const { data: profile, error: profileError } = await db
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError || !profile || !profile.setup_complete) {
      window.location.href = 'setup-profile.html';
      return;
    }

    if (callback) callback(user, profile);
  };

  // ---------- Formatting helpers ----------
  window.formatDate = function (timestamp) {
    if (!timestamp) return 'Recently';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  window.formatTime = function (timestamp) {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  window.looksLikeContactInfoLeak = function (text) {
    const emailPattern = /[^\s@]+@[^\s@]+\.[^\s@]+/;
    const phonePattern = /(\+?\d[\d\s\-().]{7,}\d)/;
    return emailPattern.test(text) || phonePattern.test(text);
  };

  // ---------- Storage helpers ----------
  window.uploadCV = async function (file, userId) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    // Path is nested under the user's own id (cvs/{userId}/{filename}) so the
    // storage RLS policies below (which check storage.foldername(name)[1]
    // against auth.uid()) actually match. The previous flat path
    // "cvs/{userId}_{timestamp}.pdf" could never satisfy that policy, which
    // silently broke per-user upload/delete permissions.
    const filePath = `${userId}/${fileName}`;

    const { data, error } = await db.storage
      .from('cvs')
      .upload(filePath, file, {
        contentType: 'application/pdf',
        upsert: false
      });

    if (error) throw error;

    // Get public URL
    const { data: { publicUrl } } = db.storage
      .from('cvs')
      .getPublicUrl(filePath);

    return { path: filePath, url: publicUrl };
  };

  window.deleteCV = async function (filePath) {
    if (!filePath) return;
    const { error } = await db.storage.from('cvs').remove([filePath]);
    if (error) console.error('CV delete error:', error);
  };

  console.log('PathFinder Supabase initialized');
})();