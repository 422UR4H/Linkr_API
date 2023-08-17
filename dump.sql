--
-- PostgreSQL database dump
--

-- Dumped from database version 13.11 (Ubuntu 13.11-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: btree_gin; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS btree_gin WITH SCHEMA public;


--
-- Name: EXTENSION btree_gin; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION btree_gin IS 'support for indexing common datatypes in GIN';


--
-- Name: btree_gist; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS btree_gist WITH SCHEMA public;


--
-- Name: EXTENSION btree_gist; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION btree_gist IS 'support for indexing common datatypes in GiST';


--
-- Name: citext; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;


--
-- Name: EXTENSION citext; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION citext IS 'data type for case-insensitive character strings';


--
-- Name: cube; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS cube WITH SCHEMA public;


--
-- Name: EXTENSION cube; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION cube IS 'data type for multidimensional cubes';


--
-- Name: dblink; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS dblink WITH SCHEMA public;


--
-- Name: EXTENSION dblink; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION dblink IS 'connect to other PostgreSQL databases from within a database';


--
-- Name: dict_int; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS dict_int WITH SCHEMA public;


--
-- Name: EXTENSION dict_int; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION dict_int IS 'text search dictionary template for integers';


--
-- Name: dict_xsyn; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS dict_xsyn WITH SCHEMA public;


--
-- Name: EXTENSION dict_xsyn; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION dict_xsyn IS 'text search dictionary template for extended synonym processing';


--
-- Name: earthdistance; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS earthdistance WITH SCHEMA public;


--
-- Name: EXTENSION earthdistance; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION earthdistance IS 'calculate great-circle distances on the surface of the Earth';


--
-- Name: fuzzystrmatch; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS fuzzystrmatch WITH SCHEMA public;


--
-- Name: EXTENSION fuzzystrmatch; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION fuzzystrmatch IS 'determine similarities and distance between strings';


--
-- Name: hstore; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS hstore WITH SCHEMA public;


--
-- Name: EXTENSION hstore; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION hstore IS 'data type for storing sets of (key, value) pairs';


--
-- Name: intarray; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS intarray WITH SCHEMA public;


--
-- Name: EXTENSION intarray; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION intarray IS 'functions, operators, and index support for 1-D arrays of integers';


--
-- Name: ltree; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS ltree WITH SCHEMA public;


--
-- Name: EXTENSION ltree; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION ltree IS 'data type for hierarchical tree-like structures';


--
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA public;


--
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_stat_statements IS 'track planning and execution statistics of all SQL statements executed';


--
-- Name: pg_trgm; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA public;


--
-- Name: EXTENSION pg_trgm; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_trgm IS 'text similarity measurement and index searching based on trigrams';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: pgrowlocks; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgrowlocks WITH SCHEMA public;


--
-- Name: EXTENSION pgrowlocks; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgrowlocks IS 'show row-level locking information';


--
-- Name: pgstattuple; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgstattuple WITH SCHEMA public;


--
-- Name: EXTENSION pgstattuple; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgstattuple IS 'show tuple-level statistics';


--
-- Name: tablefunc; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS tablefunc WITH SCHEMA public;


--
-- Name: EXTENSION tablefunc; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION tablefunc IS 'functions that manipulate whole tables, including crosstab';


--
-- Name: unaccent; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS unaccent WITH SCHEMA public;


--
-- Name: EXTENSION unaccent; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION unaccent IS 'text search dictionary that removes accents';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: xml2; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS xml2 WITH SCHEMA public;


--
-- Name: EXTENSION xml2; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION xml2 IS 'XPath querying and XSLT';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: likes; Type: TABLE; Schema: public; Owner: wcxfybxl
--

CREATE TABLE public.likes (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    liked_post_id uuid NOT NULL,
    like_owner_id uuid NOT NULL
);


ALTER TABLE public.likes OWNER TO wcxfybxl;

--
-- Name: posts; Type: TABLE; Schema: public; Owner: wcxfybxl
--

CREATE TABLE public.posts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    link text NOT NULL,
    description text NOT NULL,
    hash_tags text,
    owner_id uuid NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.posts OWNER TO wcxfybxl;

--
-- Name: users; Type: TABLE; Schema: public; Owner: wcxfybxl
--

CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email text NOT NULL,
    user_name text NOT NULL,
    password text NOT NULL,
    photo text NOT NULL
);


ALTER TABLE public.users OWNER TO wcxfybxl;

--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: wcxfybxl
--

COPY public.likes (id, liked_post_id, like_owner_id) FROM stdin;
f1818df0-6997-4318-b87e-4ef93b561386	f20d9da7-2a7a-4476-8673-2ecec6f6df00	ebb6e3eb-f0e6-46be-aa5e-148269a2cc96
3b2e7da3-4269-4481-a5e2-741330efeebb	3f1e3f89-2220-491e-9c17-7f35306c92b4	ebb6e3eb-f0e6-46be-aa5e-148269a2cc96
b8d7186f-5f15-4107-be2b-2f9af3a6220d	3f1e3f89-2220-491e-9c17-7f35306c92b4	ebb6e3eb-f0e6-46be-aa5e-148269a2cc96
55341d8f-0372-4a8d-8de8-3898df644278	f20d9da7-2a7a-4476-8673-2ecec6f6df00	ebb6e3eb-f0e6-46be-aa5e-148269a2cc96
e454703c-bb4c-4887-abfc-bfbbab3a7be9	cff6d831-9e13-4223-80c2-cad6d3ddfd15	ebb6e3eb-f0e6-46be-aa5e-148269a2cc96
a1a31b05-346c-45f8-822c-a1c8b5e48ca3	f20d9da7-2a7a-4476-8673-2ecec6f6df00	ebb6e3eb-f0e6-46be-aa5e-148269a2cc96
2eceec0e-e467-4beb-abfb-0d435f65f9af	f20d9da7-2a7a-4476-8673-2ecec6f6df00	ebb6e3eb-f0e6-46be-aa5e-148269a2cc96
4289038e-5d0f-4fa3-a864-74c3ca4cc3bd	3f1e3f89-2220-491e-9c17-7f35306c92b4	ebb6e3eb-f0e6-46be-aa5e-148269a2cc96
e57b2063-ae54-42b5-9c01-fb1f85850721	3f1e3f89-2220-491e-9c17-7f35306c92b4	ccee220c-5af2-46cc-8709-e9b7660480fd
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: wcxfybxl
--

COPY public.posts (id, link, description, hash_tags, owner_id, created_at) FROM stdin;
f20d9da7-2a7a-4476-8673-2ecec6f6df00	https://discord.com/	Discord é pika	tag3, tag4	ccee220c-5af2-46cc-8709-e9b7660480fd	2023-08-16 07:15:56.756606
3f1e3f89-2220-491e-9c17-7f35306c92b4	https://www.youtube.com/	Youtube é bom	tag3, tag4	ccee220c-5af2-46cc-8709-e9b7660480fd	2023-08-16 07:16:23.696988
cff6d831-9e13-4223-80c2-cad6d3ddfd15	https://www.globo.com/	teste	#globo	65926108-325e-47f1-bab7-968cc06f2b16	2023-08-17 03:08:30.50802
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: wcxfybxl
--

COPY public.users (id, email, user_name, password, photo) FROM stdin;
ebb6e3eb-f0e6-46be-aa5e-148269a2cc96	donl@mail.com	Don L	$2b$10$.vybzrCBlV1AkmtOzSbXOefq6kOrSD0WlcVJGBacH6r7dQgJuKNZm	https://www.vagalume.com.br/don-l/images/don-l.jpg
ccee220c-5af2-46cc-8709-e9b7660480fd	test@mail.com	test	$2b$10$q8/tyy/DsRFYAsXFpisrFu.RyaDi1gK2RC23wiO0QUpLPzgTRVnZm	https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png
6d5f619a-fa9d-4b82-badb-18c96c83f005	gui@gmail.com	gui	$2b$10$UNPD.35w7xchBeAs9O2hJeZ8SfiQOVxsMA2MpA0RsnonR.MEUJ1Y.	https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Cruzeiro_Esporte_Clube_%28logo%29.svg/1200px-Cruzeiro_Esporte_Clube_%28logo%29.svg.png
a6df4d68-4959-4ed0-bde0-631b1713a804	lucas@andrade.com	WbGeDoN	$2b$10$fdSLakhm/uROF0oLNIh87.WEVdDN7dGglLdb7i6cPPDwyoDSUp3XC	https://perfectworld.com.br/img/o-jogo/classes/classe_barbaro_thumb.png
65926108-325e-47f1-bab7-968cc06f2b16	teste1@mail.com	teste	$2b$10$y5yzKY98uJxoqsnhYEMeCuwnaUJAhNFyMLejN4dZx1JLc5x.fdoRG	https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.britannica.com%2Fbiography%2FJuvenal&psig=AOvVaw3n5ba5NqTVM9HYztmEstWV&ust=1692326031302000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCOiYy_HT4oADFQAAAAAdAAAAABAE
\.


--
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: public; Owner: wcxfybxl
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: wcxfybxl
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: wcxfybxl
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: wcxfybxl
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: likes likes_fk0; Type: FK CONSTRAINT; Schema: public; Owner: wcxfybxl
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_fk0 FOREIGN KEY (liked_post_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: likes likes_fk1; Type: FK CONSTRAINT; Schema: public; Owner: wcxfybxl
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_fk1 FOREIGN KEY (like_owner_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: posts posts_fk0; Type: FK CONSTRAINT; Schema: public; Owner: wcxfybxl
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_fk0 FOREIGN KEY (owner_id) REFERENCES public.users(id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

