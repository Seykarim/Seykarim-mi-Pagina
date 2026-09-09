"use client";

import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { Star, GitFork, ExternalLink, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const GITHUB_USERNAME = "Seykarim";
const REPOS_TO_SHOW = 6;

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
};

export default function GithubProjects() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [status, setStatus] = useState<"loading" | "error" | "ready">(
    "loading"
  );

  useEffect(() => {
    let isMounted = true;

    async function fetchRepos() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=${REPOS_TO_SHOW}`,
          { headers: { Accept: "application/vnd.github+json" } }
        );

        if (!res.ok) {
          throw new Error(`GitHub API respondio con estado ${res.status}`);
        }

        const data: Repo[] = await res.json();

        if (isMounted) {
          setRepos(data);
          setStatus("ready");
        }
      } catch (err) {
        console.error("Error cargando repos de GitHub:", err);
        if (isMounted) setStatus("error");
      }
    }

    fetchRepos();

    return () => {
      isMounted = false;
    };
  }, []);

  if (status === "loading") {
    return (
      <div className="glass-card p-8 flex items-center justify-center gap-3 h-40 text-zinc-400 text-sm">
        <Loader2 size={18} className="animate-spin" />
        Cargando repositorios...
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="glass-card p-8 flex flex-col items-center justify-center h-40 text-zinc-400 text-sm gap-2">
        <span>No se pudieron cargar los repositorios en este momento.</span>
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-neon-cyan hover:underline flex items-center gap-1"
        >
          Ver perfil en GitHub <ExternalLink size={14} />
        </a>
      </div>
    );
  }

  if (repos.length === 0) {
    return (
      <div className="glass-card p-8 flex items-center justify-center h-40 text-zinc-500 text-sm">
        Este usuario aun no tiene repositorios publicos.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {repos.map((repo) => (
        <a
          key={repo.id}
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "glass-card p-6 flex flex-col gap-3 h-44 group",
            "hover:shadow-neon-purple"
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <FaGithub className="text-neon-purple shrink-0" size={16} />
              <span className="font-medium truncate">{repo.name}</span>
            </div>
            <ExternalLink
              size={14}
              className="text-zinc-500 group-hover:text-neon-cyan shrink-0"
            />
          </div>

          <p className="text-sm text-zinc-400 line-clamp-2 flex-1">
            {repo.description ?? "Sin descripcion disponible."}
          </p>

          <div className="flex items-center gap-4 text-xs text-zinc-500">
            {repo.language && (
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-neon-cyan inline-block" />
                {repo.language}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Star size={12} /> {repo.stargazers_count}
            </span>
            <span className="flex items-center gap-1">
              <GitFork size={12} /> {repo.forks_count}
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
