import AdminAuthLayout from "../../layouts/AdminAuthLayout";

function InitPage() {
  return (
    <AdminAuthLayout>
      <div className="prose prose-lg prose-invert prose-h2:mb-4">
        <h2>Registration</h2>
        <p>
          The Init page registers the first user as an admin if no users exist.
        </p>
      </div>
    </AdminAuthLayout>
  );
}

export default InitPage;
