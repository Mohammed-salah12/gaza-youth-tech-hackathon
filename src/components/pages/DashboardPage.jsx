import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  buildSubmissionSummary,
  formatSubmissionDate,
  getAdditionalTeamMembers,
  getAgeDetails,
  getApplicationOwnerLabel,
  getProjectVideoStatusKey,
  getProjectVideoStatusLabel,
} from '../../utils/appUtils'
import {
  createAdmin,
  createAroundRoomMedia,
  deleteAdmin,
  deleteAroundRoomMedia,
  fetchAdmins,
  fetchAroundRoomMedia,
  fetchSubmissions,
  updateAdmin,
  updateAroundRoomMedia,
  updateSubmissionNotes,
  updateSubmissionReviewStage,
} from '../../utils/apiClient'

const adminRoles = ['owner', 'admin', 'editor', 'reviewer']
const mediaSizes = ['hero', 'story', 'square', 'landscape', 'banner']
const mediaTones = ['peach', 'flash', 'sun', 'mint', 'mist', 'night', 'blue']

export default function DashboardPage({ content, language, onNavigate }) {
  const [submissions, setSubmissions] = useState([])
  const [selectedId, setSelectedId] = useState('')
  const [stageFilter, setStageFilter] = useState('all')
  const [searchValue, setSearchValue] = useState('')
  const [notesDraft, setNotesDraft] = useState('')
  const [feedback, setFeedback] = useState('')
  const [submissionsError, setSubmissionsError] = useState('')
  const [isLoadingSubmissions, setIsLoadingSubmissions] = useState(true)

  const [mediaEntries, setMediaEntries] = useState([])
  const [mediaFormState, setMediaFormState] = useState(createEmptyMediaFormState())
  const [editingMediaId, setEditingMediaId] = useState('')
  const [mediaFeedback, setMediaFeedback] = useState('')
  const [isSavingMedia, setIsSavingMedia] = useState(false)

  const [admins, setAdmins] = useState([])
  const [adminFormState, setAdminFormState] = useState(createEmptyAdminFormState())
  const [editingAdminId, setEditingAdminId] = useState('')
  const [adminFeedback, setAdminFeedback] = useState('')
  const [isSavingAdmin, setIsSavingAdmin] = useState(false)

  const dashboardUi = useMemo(
    () =>
      language === 'ar'
        ? {
            refresh: 'تحديث البيانات',
            backendError:
              'تعذر تحميل بيانات اللوحة من الخادم. تأكد من تشغيل الباك إند وربطه بقاعدة Mongo Atlas.',
            stageSaved: 'تم تحديث حالة المراجعة.',
            stageFailed: 'تعذر تحديث حالة المراجعة الآن.',
            notesFailed: 'تعذر حفظ الملاحظات الآن.',
            mediaEyebrow: 'إدارة من أجواء المكان',
            mediaTitle: 'أضف الصور والفيديوهات التي ستظهر في Around the room',
            mediaText:
              'هذه الإضافات تظهر في الواجهة الرئيسية داخل القسم نفسه، فوق المحتوى الثابت الحالي.',
            adminsEyebrow: 'إدارة المشرفين',
            adminsTitle: 'إنشاء وتعديل وحذف حسابات المشرفين',
            adminsText:
              'يمكنك تجهيز قائمة المنظمين والمراجعين في Mongo Atlas من نفس اللوحة.',
            createMedia: 'إضافة الوسيط',
            updateMedia: 'حفظ التعديل',
            createAdmin: 'إضافة مشرف',
            updateAdmin: 'حفظ المشرف',
            cancelEdit: 'إلغاء التعديل',
            deleteItem: 'حذف',
            editItem: 'تعديل',
            noMedia: 'لا توجد عناصر ديناميكية بعد.',
            noAdmins: 'لا توجد حسابات مشرفين بعد.',
            mediaSaved: 'تم حفظ الوسيط في الخادم.',
            mediaDeleted: 'تم حذف الوسيط.',
            mediaFailed: 'تعذر حفظ الوسيط الآن.',
            adminSaved: 'تم حفظ بيانات المشرف.',
            adminDeleted: 'تم حذف المشرف.',
            adminFailed: 'تعذر حفظ بيانات المشرف الآن.',
            mediaType: 'نوع الوسيط',
            photo: 'صورة',
            video: 'فيديو',
            badgeEn: 'الشارة بالإنجليزية',
            badgeAr: 'الشارة بالعربية',
            titleEn: 'العنوان بالإنجليزية',
            titleAr: 'العنوان بالعربية',
            noteEn: 'الوصف بالإنجليزية',
            noteAr: 'الوصف بالعربية',
            altEn: 'النص البديل بالإنجليزية',
            altAr: 'النص البديل بالعربية',
            size: 'الحجم',
            tone: 'الطابع',
            publish: 'منشور',
            mediaFile: 'ملف الصورة أو الفيديو',
            posterFile: 'بوستر الفيديو',
            mediaPreview: 'معاينة',
            fullName: 'الاسم الكامل',
            email: 'البريد الإلكتروني',
            role: 'الدور',
            password: 'كلمة المرور',
            active: 'نشط',
            mediaRequired: 'ملف الوسيط مطلوب عند إنشاء عنصر جديد.',
            posterRequired: 'الفيديو يحتاج إلى بوستر ليظهر بشكل جيد في البطاقة.',
            passwordRequired: 'كلمة المرور مطلوبة عند إنشاء مشرف جديد.',
            passwordHint: 'أدخل كلمة مرور جديدة فقط إذا أردت تغييرها.',
            publishedYes: 'منشور',
            publishedNo: 'مخفي',
            activeYes: 'نعم',
            activeNo: 'لا',
            deleteConfirmMedia: 'هل تريد حذف هذا الوسيط من لوحة التحكم؟',
            deleteConfirmAdmin: 'هل تريد حذف هذا المشرف؟',
            emptySelection: 'اختر طلبًا من القائمة لعرض التفاصيل.',
          }
        : {
            refresh: 'Refresh data',
            backendError:
              'The dashboard could not load data from the backend. Make sure the server is running and connected to Mongo Atlas.',
            stageSaved: 'Review stage updated.',
            stageFailed: 'The review stage could not be updated right now.',
            notesFailed: 'Organizer notes could not be saved right now.',
            mediaEyebrow: 'Around the room manager',
            mediaTitle: 'Add the photos and videos shown in Around the room',
            mediaText:
              'These entries appear on the public homepage inside the same section, above the current static gallery.',
            adminsEyebrow: 'Admin manager',
            adminsTitle: 'Create, edit, and delete organizer admins',
            adminsText:
              'This lets the team keep its organizer and reviewer list inside Mongo Atlas from the same dashboard.',
            createMedia: 'Create media',
            updateMedia: 'Save media changes',
            createAdmin: 'Create admin',
            updateAdmin: 'Save admin changes',
            cancelEdit: 'Cancel editing',
            deleteItem: 'Delete',
            editItem: 'Edit',
            noMedia: 'No dynamic Around the room entries yet.',
            noAdmins: 'No admins have been created yet.',
            mediaSaved: 'The media entry was saved.',
            mediaDeleted: 'The media entry was deleted.',
            mediaFailed: 'The media entry could not be saved right now.',
            adminSaved: 'The admin record was saved.',
            adminDeleted: 'The admin record was deleted.',
            adminFailed: 'The admin record could not be saved right now.',
            mediaType: 'Media type',
            photo: 'Photo',
            video: 'Video',
            badgeEn: 'Badge in English',
            badgeAr: 'Badge in Arabic',
            titleEn: 'Title in English',
            titleAr: 'Title in Arabic',
            noteEn: 'Note in English',
            noteAr: 'Note in Arabic',
            altEn: 'Image alt in English',
            altAr: 'Image alt in Arabic',
            size: 'Size',
            tone: 'Tone',
            publish: 'Published',
            mediaFile: 'Image or video file',
            posterFile: 'Video poster image',
            mediaPreview: 'Preview',
            fullName: 'Full name',
            email: 'Email',
            role: 'Role',
            password: 'Password',
            active: 'Active',
            mediaRequired: 'A media file is required when creating a new entry.',
            posterRequired: 'Video cards need a poster image so they render nicely in the grid.',
            passwordRequired: 'A password is required when creating a new admin.',
            passwordHint: 'Only enter a password if you want to set or change it.',
            publishedYes: 'Published',
            publishedNo: 'Hidden',
            activeYes: 'Yes',
            activeNo: 'No',
            deleteConfirmMedia: 'Delete this media entry from the dashboard?',
            deleteConfirmAdmin: 'Delete this admin record?',
            emptySelection: 'Choose a submission from the queue to see its details.',
          },
    [language],
  )

  const categoriesById = useMemo(
    () => Object.fromEntries(content.form.categories.map((item) => [item.id, item.label])),
    [content.form.categories],
  )
  const projectStagesById = useMemo(
    () => Object.fromEntries(content.form.stages.map((item) => [item.id, item.label])),
    [content.form.stages],
  )
  const teamModesById = useMemo(
    () => Object.fromEntries(content.form.teamModes.map((item) => [item.id, item.label])),
    [content.form.teamModes],
  )
  const reviewStagesById = useMemo(
    () =>
      Object.fromEntries(content.dashboard.reviewStages.map((item) => [item.id, item.label])),
    [content.dashboard.reviewStages],
  )

  const loadDashboardData = useCallback(async () => {
    setIsLoadingSubmissions(true)
    setSubmissionsError('')

    try {
      const [submissionRows, mediaRows, adminRows] = await Promise.all([
        fetchSubmissions(),
        fetchAroundRoomMedia(true),
        fetchAdmins(),
      ])

      setSubmissions(submissionRows || [])
      setMediaEntries(mediaRows || [])
      setAdmins(adminRows || [])
    } catch (error) {
      setSubmissionsError(error.message || dashboardUi.backendError)
    } finally {
      setIsLoadingSubmissions(false)
    }
  }, [dashboardUi.backendError])

  useEffect(() => {
    loadDashboardData()
  }, [loadDashboardData])

  const filteredSubmissions = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase()

    return submissions.filter((submission) => {
      const matchesStage = stageFilter === 'all' || submission.reviewStage === stageFilter

      if (!matchesStage) {
        return false
      }

      if (!normalizedSearch) {
        return true
      }

      return [
        submission.projectId,
        submission.fullName,
        submission.projectName,
        submission.city,
        submission.school,
        submission.contact,
        submission.teamMembers,
        submission.teamMemberTwoName,
        submission.teamMemberTwoAge,
        submission.teamMemberTwoCity,
        submission.teamMemberTwoContact,
        submission.teamMemberThreeName,
        submission.teamMemberThreeAge,
        submission.teamMemberThreeCity,
        submission.teamMemberThreeContact,
        submission.adultRole,
        submission.adultName,
        submission.mentorName,
        submission.mentorContact,
        categoriesById[submission.category] || '',
      ].some((value) => String(value || '').toLowerCase().includes(normalizedSearch))
    })
  }, [categoriesById, searchValue, stageFilter, submissions])

  useEffect(() => {
    if (!selectedId && filteredSubmissions[0]) {
      setSelectedId(filteredSubmissions[0].id)
      return
    }

    if (
      filteredSubmissions.length > 0 &&
      !filteredSubmissions.some((submission) => submission.id === selectedId)
    ) {
      setSelectedId(filteredSubmissions[0].id)
    }
  }, [filteredSubmissions, selectedId])

  const selectedSubmission =
    filteredSubmissions.find((submission) => submission.id === selectedId) ||
    filteredSubmissions[0] ||
    null
  const selectedAdditionalTeamMembers = selectedSubmission
    ? getAdditionalTeamMembers(selectedSubmission, content.form)
    : []
  const selectedProjectVideoStatusLabel = selectedSubmission
    ? getProjectVideoStatusLabel(
        selectedSubmission.projectVideoStatus || getProjectVideoStatusKey(selectedSubmission),
        content.form,
      )
    : ''

  useEffect(() => {
    setNotesDraft(selectedSubmission?.organizerNotes || '')
    setFeedback('')
  }, [selectedSubmission?.id])

  const handleStageChange = async (submissionId, reviewStage) => {
    try {
      const updated = await updateSubmissionReviewStage(submissionId, reviewStage)
      setSubmissions((current) =>
        sortSubmissionsByUpdatedAt(
          current.map((submission) => (submission.id === submissionId ? updated : submission)),
        ),
      )
      setFeedback(dashboardUi.stageSaved)
    } catch (error) {
      setFeedback(error.message || dashboardUi.stageFailed)
    }
  }

  const handleSaveNotes = async () => {
    if (!selectedSubmission) {
      return
    }

    try {
      const updated = await updateSubmissionNotes(selectedSubmission.id, notesDraft)
      setSubmissions((current) =>
        sortSubmissionsByUpdatedAt(
          current.map((submission) =>
            submission.id === selectedSubmission.id ? updated : submission,
          ),
        ),
      )
      setFeedback(content.dashboard.feedback.notesSaved)
    } catch (error) {
      setFeedback(error.message || dashboardUi.notesFailed)
    }
  }

  const handleCopySummary = async () => {
    if (!selectedSubmission) {
      return
    }

    try {
      await navigator.clipboard.writeText(
        buildSubmissionSummary(selectedSubmission, content.form, categoriesById, projectStagesById),
      )
      setFeedback(content.dashboard.feedback.copied)
    } catch {
      setFeedback(content.dashboard.feedback.blocked)
    }
  }

  const handleMediaFieldChange = (field, value) => {
    setMediaFormState((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const handleAdminFieldChange = (field, value) => {
    setAdminFormState((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const resetMediaForm = () => {
    setMediaFormState(createEmptyMediaFormState())
    setEditingMediaId('')
    setMediaFeedback('')
  }

  const resetAdminForm = () => {
    setAdminFormState(createEmptyAdminFormState())
    setEditingAdminId('')
    setAdminFeedback('')
  }

  const handleEditMedia = (entry) => {
    setEditingMediaId(entry.id)
    setMediaFormState({
      type: entry.type,
      badge: entry.badge,
      badgeAr: entry.badgeAr,
      title: entry.title,
      titleAr: entry.titleAr,
      note: entry.note,
      noteAr: entry.noteAr,
      imageAlt: entry.imageAlt,
      imageAltAr: entry.imageAltAr,
      size: entry.size,
      tone: entry.tone,
      isPublished: entry.isPublished,
      mediaFile: null,
      posterFile: null,
    })
    setMediaFeedback('')
  }

  const handleMediaSubmit = async (event) => {
    event.preventDefault()

    if (!editingMediaId && !mediaFormState.mediaFile) {
      setMediaFeedback(dashboardUi.mediaRequired)
      return
    }

    if (
      mediaFormState.type === 'video' &&
      !editingMediaId &&
      !mediaFormState.posterFile
    ) {
      setMediaFeedback(dashboardUi.posterRequired)
      return
    }

    setIsSavingMedia(true)
    setMediaFeedback('')

    try {
      const payload = buildAroundRoomMediaFormData(mediaFormState)
      const savedEntry = editingMediaId
        ? await updateAroundRoomMedia(editingMediaId, payload)
        : await createAroundRoomMedia(payload)

      setMediaEntries((current) =>
        sortMediaEntriesByCreatedAt(
          editingMediaId
            ? current.map((entry) => (entry.id === editingMediaId ? savedEntry : entry))
            : [savedEntry, ...current],
        ),
      )
      resetMediaForm()
      setMediaFeedback(dashboardUi.mediaSaved)
    } catch (error) {
      setMediaFeedback(error.message || dashboardUi.mediaFailed)
    } finally {
      setIsSavingMedia(false)
    }
  }

  const handleDeleteMedia = async (entryId) => {
    if (!window.confirm(dashboardUi.deleteConfirmMedia)) {
      return
    }

    try {
      await deleteAroundRoomMedia(entryId)
      setMediaEntries((current) => current.filter((entry) => entry.id !== entryId))
      if (editingMediaId === entryId) {
        resetMediaForm()
      }
      setMediaFeedback(dashboardUi.mediaDeleted)
    } catch (error) {
      setMediaFeedback(error.message || dashboardUi.mediaFailed)
    }
  }

  const handleEditAdmin = (admin) => {
    setEditingAdminId(admin.id)
    setAdminFormState({
      fullName: admin.fullName,
      email: admin.email,
      role: admin.role,
      password: '',
      isActive: admin.isActive,
    })
    setAdminFeedback('')
  }

  const handleAdminSubmit = async (event) => {
    event.preventDefault()

    if (!editingAdminId && !adminFormState.password.trim()) {
      setAdminFeedback(dashboardUi.passwordRequired)
      return
    }

    setIsSavingAdmin(true)
    setAdminFeedback('')

    try {
      const payload = {
        fullName: adminFormState.fullName.trim(),
        email: adminFormState.email.trim(),
        role: adminFormState.role,
        password: adminFormState.password,
        isActive: adminFormState.isActive,
      }

      const savedAdmin = editingAdminId
        ? await updateAdmin(editingAdminId, payload)
        : await createAdmin(payload)

      setAdmins((current) =>
        editingAdminId
          ? current.map((admin) => (admin.id === editingAdminId ? savedAdmin : admin))
          : [savedAdmin, ...current],
      )
      resetAdminForm()
      setAdminFeedback(dashboardUi.adminSaved)
    } catch (error) {
      setAdminFeedback(error.message || dashboardUi.adminFailed)
    } finally {
      setIsSavingAdmin(false)
    }
  }

  const handleDeleteAdmin = async (adminId) => {
    if (!window.confirm(dashboardUi.deleteConfirmAdmin)) {
      return
    }

    try {
      await deleteAdmin(adminId)
      setAdmins((current) => current.filter((admin) => admin.id !== adminId))
      if (editingAdminId === adminId) {
        resetAdminForm()
      }
      setAdminFeedback(dashboardUi.adminDeleted)
    } catch (error) {
      setAdminFeedback(error.message || dashboardUi.adminFailed)
    }
  }

  const stats = [
    {
      label: content.dashboard.stats.total,
      value: submissions.length,
    },
    {
      label: content.dashboard.stats.pending,
      value: submissions.filter((submission) =>
        ['submitted', 'reviewing'].includes(submission.reviewStage),
      ).length,
    },
    {
      label: content.dashboard.stats.shortlisted,
      value: submissions.filter((submission) => submission.reviewStage === 'shortlisted').length,
    },
    {
      label: content.dashboard.stats.accepted,
      value: submissions.filter((submission) => submission.reviewStage === 'accepted').length,
    },
  ]

  return (
    <>
      <section className="dashboard-hero">
        <div className="container dashboard-hero-grid">
          <div>
            <span className="eyebrow">{content.dashboard.eyebrow}</span>
            <h1>{content.dashboard.title}</h1>
            <p className="hero-text">{content.dashboard.text}</p>

            <div className="hero-actions">
              <button
                type="button"
                className="primary-button"
                onClick={() => onNavigate('contact', 'apply')}
              >
                {content.dashboard.primary}
              </button>
              <button type="button" className="secondary-button" onClick={loadDashboardData}>
                {dashboardUi.refresh}
              </button>
            </div>
          </div>

          <div className="dashboard-stat-grid">
            {stats.map((item) => (
              <article key={item.label} className="dashboard-stat-card">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container dashboard-layout">
          <aside className="dashboard-sidebar">
            <article className="dashboard-panel">
              <div className="panel-header">
                <div>
                  <span className="card-eyebrow">{content.dashboard.filtersTitle}</span>
                  <h2>{content.dashboard.queueTitle}</h2>
                </div>
                <p>{content.dashboard.queueText}</p>
              </div>

              <label className="field">
                <span>{content.dashboard.searchLabel}</span>
                <input
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  placeholder={content.dashboard.searchPlaceholder}
                />
              </label>

              <div className="filter-chip-row">
                <button
                  type="button"
                  className={`filter-chip ${stageFilter === 'all' ? 'is-active' : ''}`}
                  onClick={() => setStageFilter('all')}
                >
                  {content.dashboard.allStages}
                </button>
                {content.dashboard.reviewStages.map((stage) => (
                  <button
                    key={stage.id}
                    type="button"
                    className={`filter-chip ${stageFilter === stage.id ? 'is-active' : ''}`}
                    onClick={() => setStageFilter(stage.id)}
                  >
                    {stage.label}
                  </button>
                ))}
              </div>
            </article>

            <article className="dashboard-panel dashboard-panel--queue">
              {isLoadingSubmissions ? (
                <div className="dashboard-empty dashboard-empty--compact">
                  <h3>{dashboardUi.refresh}</h3>
                  <p>{content.dashboard.queueText}</p>
                </div>
              ) : filteredSubmissions.length ? (
                <div className="dashboard-queue">
                  {filteredSubmissions.map((submission) => (
                    <button
                      key={submission.id}
                      type="button"
                      className={`queue-item ${
                        selectedSubmission?.id === submission.id ? 'is-active' : ''
                      }`}
                      onClick={() => setSelectedId(submission.id)}
                    >
                      <div className="queue-item__head">
                        <strong>{submission.projectName}</strong>
                        <span
                          className={`review-stage-badge review-stage-badge--${submission.reviewStage}`}
                        >
                          {reviewStagesById[submission.reviewStage] || submission.reviewStage}
                        </span>
                      </div>
                      <p>{submission.fullName}</p>
                      <div className="queue-item__meta">
                        <span>{submission.projectId || '—'}</span>
                        <span>{submission.city}</span>
                        <span>{categoriesById[submission.category] || submission.category}</span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="dashboard-empty dashboard-empty--compact">
                  <h3>{content.dashboard.queueEmptyTitle}</h3>
                  <p>{submissionsError || content.dashboard.queueEmptyText}</p>
                </div>
              )}
            </article>
          </aside>

          <section className="dashboard-detail">
            {submissionsError && !submissions.length ? (
              <div className="dashboard-empty">
                <h2>{content.dashboard.queueEmptyTitle}</h2>
                <p>{submissionsError}</p>
              </div>
            ) : selectedSubmission ? (
              <>
                <article className="dashboard-panel dashboard-panel--detail">
                  <div className="dashboard-detail-head">
                    <div>
                      <span className="card-eyebrow">{content.dashboard.detailEyebrow}</span>
                      <h2>{selectedSubmission.projectName}</h2>
                      <p>
                        {selectedSubmission.fullName} • {selectedSubmission.age}
                      </p>
                    </div>
                    <span
                      className={`review-stage-badge review-stage-badge--${selectedSubmission.reviewStage}`}
                    >
                      {reviewStagesById[selectedSubmission.reviewStage] ||
                        selectedSubmission.reviewStage}
                    </span>
                  </div>

                  <div className="dashboard-meta-grid">
                    <div className="dashboard-meta-item">
                      <span>{content.form.summaryLabels.projectId}</span>
                      <strong>{selectedSubmission.projectId || '—'}</strong>
                    </div>
                    <div className="dashboard-meta-item">
                      <span>{content.form.summaryLabels.category}</span>
                      <strong>
                        {categoriesById[selectedSubmission.category] || selectedSubmission.category}
                      </strong>
                    </div>
                    <div className="dashboard-meta-item">
                      <span>{content.dashboard.projectStageLabel}</span>
                      <strong>
                        {projectStagesById[selectedSubmission.projectStage] ||
                          selectedSubmission.projectStage}
                      </strong>
                    </div>
                    <div className="dashboard-meta-item">
                      <span>{content.dashboard.submittedAt}</span>
                      <strong>
                        {formatSubmissionDate(selectedSubmission.createdAt, language)}
                      </strong>
                    </div>
                    <div className="dashboard-meta-item">
                      <span>{content.dashboard.updatedAt}</span>
                      <strong>
                        {formatSubmissionDate(selectedSubmission.updatedAt, language)}
                      </strong>
                    </div>
                    <div className="dashboard-meta-item">
                      <span>{content.form.fields.projectVideoStatus}</span>
                      <strong>{selectedProjectVideoStatusLabel}</strong>
                    </div>
                  </div>

                  <div className="dashboard-stage-block">
                    <div className="selection-heading">
                      <strong>{content.dashboard.stageLabel}</strong>
                    </div>
                    <div className="review-stage-grid">
                      {content.dashboard.reviewStages.map((stage) => (
                        <button
                          key={stage.id}
                          type="button"
                          className={`review-stage-card ${
                            selectedSubmission.reviewStage === stage.id ? 'is-selected' : ''
                          }`}
                          onClick={() => handleStageChange(selectedSubmission.id, stage.id)}
                        >
                          <strong>{stage.label}</strong>
                          <span>{stage.description}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </article>

                <div className="dashboard-card-grid">
                  <article className="dashboard-panel dashboard-panel--response">
                    <span className="card-eyebrow">{content.dashboard.responsesTitle}</span>
                    <div className="response-block">
                      <h3>{content.form.summaryLabels.problem}</h3>
                      <p>{selectedSubmission.problem}</p>
                    </div>
                    <div className="response-block">
                      <h3>{content.form.summaryLabels.description}</h3>
                      <p>{selectedSubmission.description}</p>
                    </div>
                    <div className="response-inline-grid">
                      <div className="dashboard-meta-item">
                        <span>{content.form.summaryLabels.applicationOwner}</span>
                        <strong>
                          {getApplicationOwnerLabel(
                            getAgeDetails(selectedSubmission.age).isUnder13
                              ? 'adult'
                              : selectedSubmission.applicationOwner,
                            content.form,
                          )}
                        </strong>
                      </div>
                      <div className="dashboard-meta-item">
                        <span>{content.form.summaryLabels.contact}</span>
                        <strong>{selectedSubmission.contact}</strong>
                      </div>
                      <div className="dashboard-meta-item">
                        <span>{content.form.summaryLabels.teamType}</span>
                        <strong>
                          {teamModesById[selectedSubmission.teamType] ||
                            selectedSubmission.teamType ||
                            content.form.missingTeamType}
                        </strong>
                      </div>
                      <div className="dashboard-meta-item">
                        <span>{content.form.summaryLabels.school}</span>
                        <strong>{selectedSubmission.school || content.form.missingSchool}</strong>
                      </div>
                    </div>
                    {selectedAdditionalTeamMembers.length ? (
                      <div className="team-member-stack team-member-stack--compact">
                        {selectedAdditionalTeamMembers.map((member) => (
                          <article key={member.id} className="team-member-card">
                            <div className="team-member-card__head">
                              <strong>{member.title}</strong>
                            </div>
                            <div className="response-inline-grid">
                              <div className="dashboard-meta-item">
                                <span>{content.form.summaryLabels.fullName}</span>
                                <strong>{selectedSubmission[member.nameKey] || '—'}</strong>
                              </div>
                              <div className="dashboard-meta-item">
                                <span>{content.form.summaryLabels.age}</span>
                                <strong>{selectedSubmission[member.ageKey] || '—'}</strong>
                              </div>
                              <div className="dashboard-meta-item">
                                <span>{content.form.summaryLabels.city}</span>
                                <strong>{selectedSubmission[member.cityKey] || '—'}</strong>
                              </div>
                              <div className="dashboard-meta-item">
                                <span>{content.form.summaryLabels.teamMemberContact}</span>
                                <strong>{selectedSubmission[member.contactKey] || '—'}</strong>
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                    ) : selectedSubmission.teamMembers ? (
                      <div className="response-block">
                        <h3>{content.form.summaryLabels.teamMembers}</h3>
                        <p>{selectedSubmission.teamMembers}</p>
                      </div>
                    ) : null}
                    {selectedSubmission.adultName || selectedSubmission.adultRole ? (
                      <div className="response-inline-grid">
                        <div className="dashboard-meta-item">
                          <span>{content.form.summaryLabels.adultRole}</span>
                          <strong>{selectedSubmission.adultRole || '—'}</strong>
                        </div>
                        <div className="dashboard-meta-item">
                          <span>{content.form.summaryLabels.adultName}</span>
                          <strong>{selectedSubmission.adultName || '—'}</strong>
                        </div>
                      </div>
                    ) : null}
                    {selectedSubmission.mentorName || selectedSubmission.mentorContact ? (
                      <div className="response-inline-grid">
                        <div className="dashboard-meta-item">
                          <span>{content.form.summaryLabels.mentorName}</span>
                          <strong>{selectedSubmission.mentorName || '—'}</strong>
                        </div>
                        <div className="dashboard-meta-item">
                          <span>{content.form.summaryLabels.mentorContact}</span>
                          <strong>{selectedSubmission.mentorContact || '—'}</strong>
                        </div>
                      </div>
                    ) : null}
                    {selectedSubmission.projectVideo?.url || selectedSubmission.projectImages?.length ? (
                      <div className="dashboard-upload-block">
                        <div className="response-block">
                          <h3>{content.form.fields.projectVideo}</h3>
                          {selectedSubmission.projectVideo?.url ? (
                            <div className="dashboard-upload-preview">
                              <video controls preload="metadata" src={selectedSubmission.projectVideo.url} />
                              <a
                                className="secondary-button"
                                href={selectedSubmission.projectVideo.url}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {content.dashboard.openRecording}
                              </a>
                            </div>
                          ) : (
                            <p>{selectedProjectVideoStatusLabel}</p>
                          )}
                        </div>

                        {selectedSubmission.projectImages?.length ? (
                          <div className="response-block">
                            <h3>{content.form.fields.projectImages}</h3>
                            <div className="dashboard-upload-gallery">
                              {selectedSubmission.projectImages.map((image) => (
                                <a
                                  key={image.url}
                                  href={image.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="dashboard-upload-gallery__item"
                                >
                                  <img src={image.url} alt={image.originalName || selectedSubmission.projectName} />
                                </a>
                              ))}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    ) : (
                      <div className="response-block">
                        <h3>{content.form.fields.projectVideo}</h3>
                        <p>{selectedProjectVideoStatusLabel}</p>
                      </div>
                    )}
                  </article>

                  <article className="dashboard-panel">
                    <span className="card-eyebrow">{content.dashboard.summaryTitle}</span>
                    <pre className="dashboard-summary">
                      {buildSubmissionSummary(
                        selectedSubmission,
                        content.form,
                        categoriesById,
                        projectStagesById,
                      )}
                    </pre>
                    <div className="result-actions">
                      <button type="button" className="secondary-button" onClick={handleCopySummary}>
                        {content.dashboard.copySummary}
                      </button>
                    </div>
                  </article>

                  <article className="dashboard-panel">
                    <span className="card-eyebrow">{content.dashboard.notesTitle}</span>
                    <label className="field">
                      <span>{content.dashboard.notesTitle}</span>
                      <textarea
                        rows="7"
                        value={notesDraft}
                        onChange={(event) => setNotesDraft(event.target.value)}
                        placeholder={content.dashboard.notesPlaceholder}
                      />
                    </label>
                    <div className="result-actions">
                      <button type="button" className="ghost-button" onClick={handleSaveNotes}>
                        {content.dashboard.saveNotes}
                      </button>
                    </div>
                    {feedback ? <p className="form-feedback">{feedback}</p> : null}
                  </article>
                </div>
              </>
            ) : submissions.length ? (
              <div className="dashboard-empty">
                <h2>{content.dashboard.queueEmptyTitle}</h2>
                <p>{content.dashboard.queueEmptyText}</p>
              </div>
            ) : (
              <div className="dashboard-empty">
                <h2>{content.dashboard.emptyTitle}</h2>
                <p>{submissionsError || content.dashboard.emptyText}</p>
                <button
                  type="button"
                  className="primary-button"
                  onClick={() => onNavigate('contact', 'apply')}
                >
                  {content.dashboard.primary}
                </button>
              </div>
            )}
          </section>
        </div>
      </section>

      <section className="section">
        <div className="container dashboard-manager-grid">
          <article className="dashboard-panel dashboard-panel--manager">
            <div className="panel-header">
              <div>
                <span className="card-eyebrow">{dashboardUi.mediaEyebrow}</span>
                <h2>{dashboardUi.mediaTitle}</h2>
              </div>
              <p>{dashboardUi.mediaText}</p>
            </div>

            <form className="dashboard-manager-form" onSubmit={handleMediaSubmit}>
              <div className="field-grid">
                <label className="field">
                  <span>{dashboardUi.mediaType}</span>
                  <select
                    value={mediaFormState.type}
                    onChange={(event) => handleMediaFieldChange('type', event.target.value)}
                  >
                    <option value="photo">{dashboardUi.photo}</option>
                    <option value="video">{dashboardUi.video}</option>
                  </select>
                </label>

                <label className="field">
                  <span>{dashboardUi.size}</span>
                  <select
                    value={mediaFormState.size}
                    onChange={(event) => handleMediaFieldChange('size', event.target.value)}
                  >
                    {mediaSizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="field">
                  <span>{dashboardUi.tone}</span>
                  <select
                    value={mediaFormState.tone}
                    onChange={(event) => handleMediaFieldChange('tone', event.target.value)}
                  >
                    {mediaTones.map((tone) => (
                      <option key={tone} value={tone}>
                        {tone}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="field">
                  <span>{dashboardUi.publish}</span>
                  <select
                    value={mediaFormState.isPublished ? 'true' : 'false'}
                    onChange={(event) =>
                      handleMediaFieldChange('isPublished', event.target.value === 'true')
                    }
                  >
                    <option value="true">{dashboardUi.publishedYes}</option>
                    <option value="false">{dashboardUi.publishedNo}</option>
                  </select>
                </label>
              </div>

              <div className="field-grid">
                <label className="field">
                  <span>{dashboardUi.badgeEn}</span>
                  <input
                    value={mediaFormState.badge}
                    onChange={(event) => handleMediaFieldChange('badge', event.target.value)}
                  />
                </label>
                <label className="field">
                  <span>{dashboardUi.badgeAr}</span>
                  <input
                    value={mediaFormState.badgeAr}
                    onChange={(event) => handleMediaFieldChange('badgeAr', event.target.value)}
                  />
                </label>
              </div>

              <div className="field-grid">
                <label className="field">
                  <span>{dashboardUi.titleEn}</span>
                  <input
                    value={mediaFormState.title}
                    onChange={(event) => handleMediaFieldChange('title', event.target.value)}
                  />
                </label>
                <label className="field">
                  <span>{dashboardUi.titleAr}</span>
                  <input
                    value={mediaFormState.titleAr}
                    onChange={(event) => handleMediaFieldChange('titleAr', event.target.value)}
                  />
                </label>
              </div>

              <div className="field-grid">
                <label className="field">
                  <span>{dashboardUi.noteEn}</span>
                  <textarea
                    rows="4"
                    value={mediaFormState.note}
                    onChange={(event) => handleMediaFieldChange('note', event.target.value)}
                  />
                </label>
                <label className="field">
                  <span>{dashboardUi.noteAr}</span>
                  <textarea
                    rows="4"
                    value={mediaFormState.noteAr}
                    onChange={(event) => handleMediaFieldChange('noteAr', event.target.value)}
                  />
                </label>
              </div>

              <div className="field-grid">
                <label className="field">
                  <span>{dashboardUi.altEn}</span>
                  <input
                    value={mediaFormState.imageAlt}
                    onChange={(event) => handleMediaFieldChange('imageAlt', event.target.value)}
                  />
                </label>
                <label className="field">
                  <span>{dashboardUi.altAr}</span>
                  <input
                    value={mediaFormState.imageAltAr}
                    onChange={(event) => handleMediaFieldChange('imageAltAr', event.target.value)}
                  />
                </label>
              </div>

              <div className="field-grid">
                <label className="field">
                  <span>{dashboardUi.mediaFile}</span>
                  <input
                    type="file"
                    accept={mediaFormState.type === 'video' ? 'video/*' : 'image/*'}
                    onChange={(event) =>
                      handleMediaFieldChange('mediaFile', event.target.files?.[0] || null)
                    }
                  />
                </label>
                <label className="field">
                  <span>{dashboardUi.posterFile}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                      handleMediaFieldChange('posterFile', event.target.files?.[0] || null)
                    }
                  />
                </label>
              </div>

              <div className="result-actions">
                <button type="submit" className="primary-button" disabled={isSavingMedia}>
                  {editingMediaId ? dashboardUi.updateMedia : dashboardUi.createMedia}
                </button>
                {editingMediaId ? (
                  <button type="button" className="secondary-button" onClick={resetMediaForm}>
                    {dashboardUi.cancelEdit}
                  </button>
                ) : null}
              </div>

              {mediaFeedback ? <p className="form-feedback">{mediaFeedback}</p> : null}
            </form>

            <div className="dashboard-manager-list">
              {mediaEntries.length ? (
                mediaEntries.map((entry) => (
                  <article key={entry.id} className="dashboard-manager-item">
                    <div className="dashboard-manager-item__head">
                      <div>
                        <strong>
                          {language === 'ar' ? entry.titleAr || entry.title : entry.title}
                        </strong>
                        <p>{language === 'ar' ? entry.badgeAr || entry.badge : entry.badge}</p>
                      </div>
                      <span
                        className={`review-stage-badge review-stage-badge--${
                          entry.isPublished ? 'accepted' : 'submitted'
                        }`}
                      >
                        {entry.type}
                      </span>
                    </div>

                    <p className="dashboard-manager-item__body">
                      {language === 'ar' ? entry.noteAr || entry.note : entry.note}
                    </p>

                    <div className="result-actions">
                      {entry.type === 'video' && entry.videoUrl ? (
                        <a
                          className="secondary-button"
                          href={entry.videoUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {dashboardUi.mediaPreview}
                        </a>
                      ) : entry.image ? (
                        <a
                          className="secondary-button"
                          href={entry.image}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {dashboardUi.mediaPreview}
                        </a>
                      ) : null}
                      <button
                        type="button"
                        className="ghost-button"
                        onClick={() => handleEditMedia(entry)}
                      >
                        {dashboardUi.editItem}
                      </button>
                      <button
                        type="button"
                        className="ghost-button"
                        onClick={() => handleDeleteMedia(entry.id)}
                      >
                        {dashboardUi.deleteItem}
                      </button>
                    </div>
                  </article>
                ))
              ) : (
                <div className="dashboard-empty dashboard-empty--compact">
                  <h3>{dashboardUi.mediaTitle}</h3>
                  <p>{dashboardUi.noMedia}</p>
                </div>
              )}
            </div>
          </article>

          <article className="dashboard-panel dashboard-panel--manager">
            <div className="panel-header">
              <div>
                <span className="card-eyebrow">{dashboardUi.adminsEyebrow}</span>
                <h2>{dashboardUi.adminsTitle}</h2>
              </div>
              <p>{dashboardUi.adminsText}</p>
            </div>

            <form className="dashboard-manager-form" onSubmit={handleAdminSubmit}>
              <div className="field-grid">
                <label className="field">
                  <span>{dashboardUi.fullName}</span>
                  <input
                    value={adminFormState.fullName}
                    onChange={(event) => handleAdminFieldChange('fullName', event.target.value)}
                  />
                </label>
                <label className="field">
                  <span>{dashboardUi.email}</span>
                  <input
                    type="email"
                    value={adminFormState.email}
                    onChange={(event) => handleAdminFieldChange('email', event.target.value)}
                  />
                </label>
              </div>

              <div className="field-grid">
                <label className="field">
                  <span>{dashboardUi.role}</span>
                  <select
                    value={adminFormState.role}
                    onChange={(event) => handleAdminFieldChange('role', event.target.value)}
                  >
                    {adminRoles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="field">
                  <span>{dashboardUi.active}</span>
                  <select
                    value={adminFormState.isActive ? 'true' : 'false'}
                    onChange={(event) =>
                      handleAdminFieldChange('isActive', event.target.value === 'true')
                    }
                  >
                    <option value="true">true</option>
                    <option value="false">false</option>
                  </select>
                </label>
              </div>

              <label className="field">
                <span>{dashboardUi.password}</span>
                <input
                  type="password"
                  value={adminFormState.password}
                  onChange={(event) => handleAdminFieldChange('password', event.target.value)}
                  placeholder={dashboardUi.passwordHint}
                />
              </label>

              <div className="result-actions">
                <button type="submit" className="primary-button" disabled={isSavingAdmin}>
                  {editingAdminId ? dashboardUi.updateAdmin : dashboardUi.createAdmin}
                </button>
                {editingAdminId ? (
                  <button type="button" className="secondary-button" onClick={resetAdminForm}>
                    {dashboardUi.cancelEdit}
                  </button>
                ) : null}
              </div>

              {adminFeedback ? <p className="form-feedback">{adminFeedback}</p> : null}
            </form>

            <div className="dashboard-manager-list">
              {admins.length ? (
                admins.map((admin) => (
                  <article key={admin.id} className="dashboard-manager-item">
                    <div className="dashboard-manager-item__head">
                      <div>
                        <strong>{admin.fullName}</strong>
                        <p>{admin.email}</p>
                      </div>
                      <span
                        className={`review-stage-badge review-stage-badge--${
                          admin.isActive ? 'accepted' : 'submitted'
                        }`}
                      >
                        {admin.role}
                      </span>
                    </div>
                    <div className="dashboard-meta-grid dashboard-meta-grid--compact">
                      <div className="dashboard-meta-item">
                        <span>{dashboardUi.active}</span>
                        <strong>{admin.isActive ? dashboardUi.activeYes : dashboardUi.activeNo}</strong>
                      </div>
                      <div className="dashboard-meta-item">
                        <span>{content.dashboard.updatedAt}</span>
                        <strong>{formatSubmissionDate(admin.updatedAt, language)}</strong>
                      </div>
                    </div>
                    <div className="result-actions">
                      <button
                        type="button"
                        className="ghost-button"
                        onClick={() => handleEditAdmin(admin)}
                      >
                        {dashboardUi.editItem}
                      </button>
                      <button
                        type="button"
                        className="ghost-button"
                        onClick={() => handleDeleteAdmin(admin.id)}
                      >
                        {dashboardUi.deleteItem}
                      </button>
                    </div>
                  </article>
                ))
              ) : (
                <div className="dashboard-empty dashboard-empty--compact">
                  <h3>{dashboardUi.adminsTitle}</h3>
                  <p>{dashboardUi.noAdmins}</p>
                </div>
              )}
            </div>
          </article>
        </div>
      </section>
    </>
  )
}

function createEmptyMediaFormState() {
  return {
    type: 'photo',
    badge: '',
    badgeAr: '',
    title: '',
    titleAr: '',
    note: '',
    noteAr: '',
    imageAlt: '',
    imageAltAr: '',
    size: 'square',
    tone: 'mist',
    isPublished: true,
    mediaFile: null,
    posterFile: null,
  }
}

function createEmptyAdminFormState() {
  return {
    fullName: '',
    email: '',
    role: 'editor',
    password: '',
    isActive: true,
  }
}

function buildAroundRoomMediaFormData(formState) {
  const formData = new FormData()

  formData.append('type', formState.type)
  formData.append('badge', formState.badge)
  formData.append('badgeAr', formState.badgeAr)
  formData.append('title', formState.title)
  formData.append('titleAr', formState.titleAr)
  formData.append('note', formState.note)
  formData.append('noteAr', formState.noteAr)
  formData.append('imageAlt', formState.imageAlt)
  formData.append('imageAltAr', formState.imageAltAr)
  formData.append('size', formState.size)
  formData.append('tone', formState.tone)
  formData.append('isPublished', String(formState.isPublished))

  if (formState.mediaFile) {
    formData.append('mediaFile', formState.mediaFile)
  }

  if (formState.posterFile) {
    formData.append('posterFile', formState.posterFile)
  }

  return formData
}

function sortSubmissionsByUpdatedAt(submissions) {
  return [...submissions].sort(
    (left, right) =>
      new Date(right.updatedAt || right.createdAt || 0).getTime() -
      new Date(left.updatedAt || left.createdAt || 0).getTime(),
  )
}

function sortMediaEntriesByCreatedAt(entries) {
  return [...entries].sort(
    (left, right) => new Date(right.createdAt || 0).getTime() - new Date(left.createdAt || 0).getTime(),
  )
}
