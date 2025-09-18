export const addProject = async (data: Record<string, unknown>) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/projects/add-project`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
      cache: "no-store",
    }
  );

  const projectInfo = await res.json();
  return projectInfo;
};

export const getAllProject = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      tags: ["Project"],
    },
    cache: "no-store",
  });

  return res.json();
};

export const DeleteProject = async (data: Record<string, unknown>) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/projects/delete-project`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    }
  );
  const projectInfo = await res.json();
  return projectInfo;
};
export const UpdateProject = async (data: Record<string, unknown>) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/projects/update-project`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      
      body: JSON.stringify(data),
      cache: "no-store",
    }
  );
  const projectInfo = await res.json();
  return projectInfo;
};
