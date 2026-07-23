-- Un profil par utilisateur inscrit
create table public.profils (
  id uuid primary key references auth.users on delete cascade,
  email text,
  cree_le timestamptz not null default now()
);

-- Les énoncés, et rien d'autre
create table public.exercices (
  id bigint generated always as identity primary key,
  matiere text not null check (matiere in ('algebre','analyse','trigonometrie','geometrie')),
  concept text not null,
  difficulte int not null default 3 check (difficulte between 1 and 5),
  enonce text not null,
  demo boolean not null default false,
  cree_le timestamptz not null default now()
);

-- Les corrigés, dans une table séparée qui ne sera jamais lisible
-- depuis le navigateur. C'est ça qui protège ton produit.
create table public.solutions (
  exercice_id bigint primary key references public.exercices on delete cascade,
  reponse_attendue text not null,
  solution_redigee text not null,
  erreurs_typiques jsonb
);

-- Qui a payé, et jusqu'à quand
create table public.achats (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users on delete cascade,
  stripe_session_id text unique not null,
  montant_cents int not null,
  cree_le timestamptz not null default now(),
  expire_le timestamptz not null
);

-- Chaque réponse soumise par un élève
create table public.tentatives (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users on delete cascade,
  exercice_id bigint not null references public.exercices,
  reponse_eleve text not null,
  est_correcte boolean,
  type_erreur text check (type_erreur in ('conceptuelle','methodologique','calcul','enonce')),
  feedback text,
  cout_tokens int,
  cree_le timestamptz not null default now()
);

create index on public.tentatives (user_id, cree_le desc);

-- On active RLS partout. Effet immédiat : plus personne ne peut rien
-- lire ni écrire depuis le navigateur. On rouvrira au cas par cas
-- à l'étape suivante.
alter table public.profils    enable row level security;
alter table public.exercices  enable row level security;
alter table public.solutions  enable row level security;
alter table public.achats     enable row level security;
alter table public.tentatives enable row level security;
