import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ProjectsPage from './pages/projects/Projects';
import ProposalsPage from './pages/projects/Proposals';
import PlanningPage from './pages/projects/Planning';
import EventsPage from './pages/events/Events';
import EventsCalendar from './pages/events/EventsCalendar';
import HRPage from './pages/people/HR';
import InternsPage from './pages/people/Interns';
import VolunteersPage from './pages/people/Volunteers';
import BeneficiariesPage from './pages/beneficiaries/Beneficiaries';
import DonorDashboardPage from './pages/donors/DonorDashboard';
import DonorDirectoryPage from './pages/donors/DonorDirectory';
import ContributionsPage from './pages/donors/Contributions';
import CampaignsPage from './pages/donors/Campaigns';
import FollowUpPage from './pages/donors/FollowUp';
import ResourcesPage from './pages/resources/Resources';
import OccasionsPage from './pages/occasions/Occasions';
import EngagementPage from './pages/engagement/Engagement';
import OutcomesPage from './pages/outcomes/Outcomes';
import ReportsPage from './pages/reports/Reports';
import DepartmentReports from './pages/reports/DepartmentReports';
import CommunicationPage from './pages/communication/Communication';
import AdminPage from './pages/admin/Admin';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/proposals" element={<ProposalsPage />} />
          <Route path="projects/planning" element={<PlanningPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="events/calendar" element={<EventsCalendar />} />
          <Route path="people/hr" element={<HRPage />} />
          <Route path="people/interns" element={<InternsPage />} />
          <Route path="people/volunteers" element={<VolunteersPage />} />
          <Route path="beneficiaries" element={<BeneficiariesPage />} />
          <Route path="donors" element={<DonorDashboardPage />} />
          <Route path="donors/directory" element={<DonorDirectoryPage />} />
          <Route path="donors/contributions" element={<ContributionsPage />} />
          <Route path="donors/campaigns" element={<CampaignsPage />} />
          <Route path="donors/followup" element={<FollowUpPage />} />
          <Route path="resources" element={<ResourcesPage />} />
          <Route path="occasions" element={<OccasionsPage />} />
          <Route path="engagement" element={<EngagementPage />} />
          <Route path="outcomes" element={<OutcomesPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="reports/department" element={<DepartmentReports />} />
          <Route path="communication" element={<CommunicationPage />} />
          <Route path="admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
