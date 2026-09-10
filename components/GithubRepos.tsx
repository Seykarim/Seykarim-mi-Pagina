'use client';

import { useEffect, useState } from 'react';
import { FolderGit2, Star, GitFork, ExternalLink } from 'lucide-react';

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
}

export default function GithubRepos() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/users/Seykarim/repos?sort=updated&per_page=6')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setRepos(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-40 rounded-xl bg-slate-800/40 animate-pulse border border-slate-700/50" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {repos.map((repo) => (
        <a
          key={repo.id}
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="group p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors">
                <FolderGit2 className="w-5 h-5 text-cyan-400" />
                <span className="truncate">{repo.name}</span>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
            </div>
            <p className="text-slate-400 text-sm line-clamp-2 mb-4">
              {repo.description || 'Sin descripción disponible.'}
            </p>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800/80">
            <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-cyan-300 font-medium border border-slate-700/50">
              {repo.language || 'Code'}
            </span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-400" />
                {repo.stargazers_count}
              </span>
              <span className="flex items-center gap-1">
                <GitFork className="w-3.5 h-3.5 text-slate-400" />
                {repo.forks_count}
              </span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
