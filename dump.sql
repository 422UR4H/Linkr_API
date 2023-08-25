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
-- Name: comments; Type: TABLE; Schema: public; Owner: wcxfybxl
--

CREATE TABLE public.comments (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    comment text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    post_id uuid,
    writer_id uuid
);


ALTER TABLE public.comments OWNER TO wcxfybxl;

--
-- Name: followers; Type: TABLE; Schema: public; Owner: wcxfybxl
--

CREATE TABLE public.followers (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    follower uuid NOT NULL,
    following uuid NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.followers OWNER TO wcxfybxl;

--
-- Name: likes; Type: TABLE; Schema: public; Owner: wcxfybxl
--

CREATE TABLE public.likes (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    liked_post_id uuid NOT NULL,
    like_owner_id uuid NOT NULL,
    liked_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.likes OWNER TO wcxfybxl;

--
-- Name: posts; Type: TABLE; Schema: public; Owner: wcxfybxl
--

CREATE TABLE public.posts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    link text NOT NULL,
    description text,
    hash_tags text,
    owner_id uuid NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.posts OWNER TO wcxfybxl;

--
-- Name: reposts; Type: TABLE; Schema: public; Owner: wcxfybxl
--

CREATE TABLE public.reposts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    references_post_id uuid NOT NULL,
    reposted_by_id uuid NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.reposts OWNER TO wcxfybxl;

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
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: wcxfybxl
--

COPY public.comments (id, comment, created_at, post_id, writer_id) FROM stdin;
b998dbed-b3d8-4aad-b6cf-01529fecf8b9	O youtube agora ta escolhendo até o que você pesquisa!	2023-08-23 21:27:55.552269	3f1e3f89-2220-491e-9c17-7f35306c92b4	ccee220c-5af2-46cc-8709-e9b7660480fd
172c05bf-0958-4d2c-98cc-d26f192174d2	... Aiai...	2023-08-23 22:54:33.761249	3f1e3f89-2220-491e-9c17-7f35306c92b4	ccee220c-5af2-46cc-8709-e9b7660480fd
90a9351a-0158-42b6-8e03-b395a200d4ee	teste	2023-08-24 17:27:28.435381	b4718db6-0b01-48d9-9e29-efb76252ba6b	ccee220c-5af2-46cc-8709-e9b7660480fd
ea2a51e1-cced-428f-b0d7-d46b3ed35a74	test	2023-08-25 05:14:37.401642	ed499f0b-4bac-4e20-83d5-0a2ae065deaf	60cf6cc0-ceca-4f87-817b-b706c92d60de
aba66b43-b166-414e-a649-54b250d604e2	test2	2023-08-25 05:14:54.564035	ed499f0b-4bac-4e20-83d5-0a2ae065deaf	60cf6cc0-ceca-4f87-817b-b706c92d60de
ce389138-1d0b-42ac-8681-4c05c197e35a	test3	2023-08-25 05:14:58.887332	ed499f0b-4bac-4e20-83d5-0a2ae065deaf	60cf6cc0-ceca-4f87-817b-b706c92d60de
442556b6-63dc-4e6e-8d81-c4619dabf0e6	test4	2023-08-25 05:15:03.514223	ed499f0b-4bac-4e20-83d5-0a2ae065deaf	60cf6cc0-ceca-4f87-817b-b706c92d60de
38d8f285-678d-4c2c-9aa2-9e1ee1c69f8a	test4	2023-08-25 05:17:35.204113	f20d9da7-2a7a-4476-8673-2ecec6f6df00	60cf6cc0-ceca-4f87-817b-b706c92d60de
bf30f85a-e5d7-4e4b-9b7c-375079635aed	test3244	2023-08-25 05:17:41.884482	f20d9da7-2a7a-4476-8673-2ecec6f6df00	60cf6cc0-ceca-4f87-817b-b706c92d60de
d3d38ba4-9e58-4cfd-b975-4780404837d7	test32423232332324	2023-08-25 05:17:45.878551	f20d9da7-2a7a-4476-8673-2ecec6f6df00	60cf6cc0-ceca-4f87-817b-b706c92d60de
19f66000-186a-4208-ac32-4022a8c3a38d	teste: Voz: Don L Programações, synth bass e samples: Don L e Nave Teclados: Herbert Medeiros Trompete: Sidmar Vieira Arranjo de cordas e violinos: Gp Edição/arranjo de cordas: Don L Coros: Alt Niss, Luiza de Alexandre, Terra Preta, Eddu Ferreira Autores:	2023-08-25 06:36:31.090019	cf535c68-d8b4-42ac-baea-4a8ee6d35e01	60cf6cc0-ceca-4f87-817b-b706c92d60de
6663ab9a-a69c-4225-b065-1ced11f0fc8b	teste: Voz: Don L Programações, synth bass e samples: Don L e Nave Teclados: Herbert Medeiros Trompete: Sidmar Vieira Arranjo de cordas e violinos: Gp Edição/arranjo de cordas: Don L Coros: Alt Niss, Luiza de Alexandre, Terra Preta, Eddu Ferreira Autores:	2023-08-25 06:36:37.830287	cf535c68-d8b4-42ac-baea-4a8ee6d35e01	60cf6cc0-ceca-4f87-817b-b706c92d60de
29f6a7c0-2360-4a94-9516-a04280b2c555	teste: Voz: Don L Programações, synth bass e samples: Don L e Nave Teclados: Herbert Medeiros Trompete: Sidmar Vieira Arranjo de cordas e violinos: Gp Edição/arranjo de cordas: Don L Coros: Alt Niss, Luiza de Alexandre, Terra Preta, Eddu Ferreira Autores:	2023-08-25 06:37:02.88926	cf535c68-d8b4-42ac-baea-4a8ee6d35e01	60cf6cc0-ceca-4f87-817b-b706c92d60de
3422ab7a-e445-4dc2-8049-33b8c38d65de	teste: Voz: Don L Programações, synth bass e samples: Don L e Nave Teclados: Herbert Medeiros Trompete: Sidmar Vieira Arranjo de cordas e violinos: Gp Edição/arranjo de cordas: Don L Coros: Alt Niss, Luiza de Alexandre, Terra Preta, Eddu Ferreira Autores:	2023-08-25 06:37:05.816937	cf535c68-d8b4-42ac-baea-4a8ee6d35e01	60cf6cc0-ceca-4f87-817b-b706c92d60de
adffd29f-49ac-4be6-aa7e-4250e31dca41	StyledComponent.ts:139 styled-components: it looks like an unknown prop "m_bottom" is being sent through to the DOM, which will likely trigger a React console error. If you would like automatic filtering of unknown props, you can opt-into that behavior vi	2023-08-25 06:39:54.18768	ed499f0b-4bac-4e20-83d5-0a2ae065deaf	60cf6cc0-ceca-4f87-817b-b706c92d60de
05e52462-4642-435b-aa77-56d90696d785	a	2023-08-25 06:43:47.246363	ed499f0b-4bac-4e20-83d5-0a2ae065deaf	60cf6cc0-ceca-4f87-817b-b706c92d60de
6fdd9877-4d87-4852-9ac6-f9b4134f1069	das	2023-08-25 06:45:05.894177	ed499f0b-4bac-4e20-83d5-0a2ae065deaf	60cf6cc0-ceca-4f87-817b-b706c92d60de
a3d0a9da-4c1d-4041-bf3d-0a3da369fd1e	asd	2023-08-25 06:45:42.012072	ed499f0b-4bac-4e20-83d5-0a2ae065deaf	60cf6cc0-ceca-4f87-817b-b706c92d60de
1082e361-f1be-4edd-a7bf-ecf0289af383	vou fazer uma música sobre!	2023-08-25 06:49:31.731368	3f1e3f89-2220-491e-9c17-7f35306c92b4	ebb6e3eb-f0e6-46be-aa5e-148269a2cc96
0df4c32a-5afa-4cfc-b560-41e25d21122e	vou fazer uma música sobre!	2023-08-25 06:49:32.85933	3f1e3f89-2220-491e-9c17-7f35306c92b4	ebb6e3eb-f0e6-46be-aa5e-148269a2cc96
0a483eca-6341-475a-91d0-13a51ef37368	como pode ver, vou fazer duas músicas sobre!!	2023-08-25 06:50:56.82736	3f1e3f89-2220-491e-9c17-7f35306c92b4	ebb6e3eb-f0e6-46be-aa5e-148269a2cc96
209754c5-5927-4ba1-aee6-6b968e775f79	as	2023-08-25 06:51:17.519609	ed499f0b-4bac-4e20-83d5-0a2ae065deaf	60cf6cc0-ceca-4f87-817b-b706c92d60de
575e4d46-8aaa-4709-abc3-0921cae7e831	dsa	2023-08-25 06:54:06.963294	ed499f0b-4bac-4e20-83d5-0a2ae065deaf	60cf6cc0-ceca-4f87-817b-b706c92d60de
d15a6788-26f1-49bc-924e-4fe98ab8ce38	sda	2023-08-25 06:55:14.716167	ed499f0b-4bac-4e20-83d5-0a2ae065deaf	60cf6cc0-ceca-4f87-817b-b706c92d60de
6bba65a4-ef7f-4bd9-9a94-2e7d21c017ba	a	2023-08-25 07:54:21.759509	3404bd40-13f2-48a8-8e82-cf2679965b41	60cf6cc0-ceca-4f87-817b-b706c92d60de
98383fb8-46a9-420b-8e0c-5549bf04e4da	a	2023-08-25 09:21:08.201917	97bf2718-1441-4dd2-ac11-6982c0af55c8	60cf6cc0-ceca-4f87-817b-b706c92d60de
c902bb23-641a-4ce7-b6da-17210a083567	Test	2023-08-25 10:22:19.723196	ed499f0b-4bac-4e20-83d5-0a2ae065deaf	2376bbbd-6df6-4d0d-8500-5caf55e60d1c
\.


--
-- Data for Name: followers; Type: TABLE DATA; Schema: public; Owner: wcxfybxl
--

COPY public.followers (id, follower, following, created_at) FROM stdin;
741ef139-21ba-488b-94e0-d2ec4ea7831b	60cf6cc0-ceca-4f87-817b-b706c92d60de	ccee220c-5af2-46cc-8709-e9b7660480fd	2023-08-22 15:56:15.452078
9d488419-11a1-4c65-ae07-21240f7afee9	60cf6cc0-ceca-4f87-817b-b706c92d60de	f6565c2c-cc70-45e2-affe-7e2b4e5b6eaa	2023-08-22 16:16:44.812472
fd34beea-c651-4fb4-a31d-2573eba76aa8	6d5f619a-fa9d-4b82-badb-18c96c83f005	2376bbbd-6df6-4d0d-8500-5caf55e60d1c	2023-08-22 21:38:10.285258
86826c35-3976-4764-8db5-e773cc32a678	6d5f619a-fa9d-4b82-badb-18c96c83f005	ccee220c-5af2-46cc-8709-e9b7660480fd	2023-08-22 22:31:45.256096
060b411f-6390-4c2a-9196-cf389630e16f	6d5f619a-fa9d-4b82-badb-18c96c83f005	60cf6cc0-ceca-4f87-817b-b706c92d60de	2023-08-24 04:14:18.383961
f8a2033e-4554-4a92-a013-ecb9b026cd14	f6565c2c-cc70-45e2-affe-7e2b4e5b6eaa	ccee220c-5af2-46cc-8709-e9b7660480fd	2023-08-24 21:29:52.641517
5adab168-41f6-4693-bc57-2671791f97ba	cb07bae3-374a-4187-a451-8b6f32c1b4e8	f6565c2c-cc70-45e2-affe-7e2b4e5b6eaa	2023-08-24 21:34:32.800986
e3f48db3-282e-478b-99af-4c10068d32d0	ccee220c-5af2-46cc-8709-e9b7660480fd	ebb6e3eb-f0e6-46be-aa5e-148269a2cc96	2023-08-25 05:57:13.243798
3eb2d61e-a393-49d0-9fdf-b65c8235d7fe	ebb6e3eb-f0e6-46be-aa5e-148269a2cc96	ccee220c-5af2-46cc-8709-e9b7660480fd	2023-08-25 05:58:08.159706
63209307-a7b9-4961-93ac-28bb777ccd49	60cf6cc0-ceca-4f87-817b-b706c92d60de	2376bbbd-6df6-4d0d-8500-5caf55e60d1c	2023-08-25 10:27:52.453477
\.


--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: wcxfybxl
--

COPY public.likes (id, liked_post_id, like_owner_id, liked_at) FROM stdin;
89fce352-a0c6-49c9-93e3-654d45a43692	d6e54d20-bf48-4168-817b-e24c5e166701	9f4b9f5c-d383-4504-926c-0126bc1f16cd	2023-08-21 12:26:59.668772
e37d037e-f632-4416-8a01-bce6d4dbb9f6	d6e54d20-bf48-4168-817b-e24c5e166701	6d5f619a-fa9d-4b82-badb-18c96c83f005	2023-08-21 12:26:59.668772
0e2f9fc7-4cce-44a7-badc-81cd02eaf2f6	4acfca49-b1b8-4638-9f32-36cc207c7499	83036091-84e8-4434-a6a7-0485e32c4d2b	2023-08-21 12:26:59.668772
a6e7be95-47b9-4339-bc79-a4d06d9e4d3b	ed499f0b-4bac-4e20-83d5-0a2ae065deaf	83036091-84e8-4434-a6a7-0485e32c4d2b	2023-08-21 12:26:59.668772
380e05ea-72d4-4967-8fc9-82a8b4c83b24	4acfca49-b1b8-4638-9f32-36cc207c7499	60cf6cc0-ceca-4f87-817b-b706c92d60de	2023-08-21 12:26:59.668772
787b49b8-cb1e-4f15-a2a9-19f48a7975b6	cff6d831-9e13-4223-80c2-cad6d3ddfd15	60cf6cc0-ceca-4f87-817b-b706c92d60de	2023-08-21 12:26:59.668772
12d6da9e-d22b-4240-b03b-b6602804b833	f20d9da7-2a7a-4476-8673-2ecec6f6df00	2376bbbd-6df6-4d0d-8500-5caf55e60d1c	2023-08-21 12:26:59.668772
8a7b8097-3b9e-4446-a589-ae3df66e55c1	2a4400e5-30cc-44b9-9433-dbe355c35274	60cf6cc0-ceca-4f87-817b-b706c92d60de	2023-08-24 00:14:07.739804
f0d7d10f-43e1-4a91-9430-4fe113c7e6bd	5b057d7e-44fd-4c02-8798-a0eb0ec6c6df	60cf6cc0-ceca-4f87-817b-b706c92d60de	2023-08-24 00:14:16.005794
f8ebc245-50c1-4fbc-a5b1-4e59dd881b31	294b240a-36ea-4803-a902-ba9eb1c0e085	6d5f619a-fa9d-4b82-badb-18c96c83f005	2023-08-21 12:26:59.668772
f7a349e5-b135-4480-8a79-39fcb92863f2	067a49a5-f2fd-44ed-afac-359cbad87834	60cf6cc0-ceca-4f87-817b-b706c92d60de	2023-08-21 13:45:20.132154
bd4ad022-1ef4-4a95-8489-e3bd76271816	d6e54d20-bf48-4168-817b-e24c5e166701	ebb6e3eb-f0e6-46be-aa5e-148269a2cc96	2023-08-21 20:04:47.073743
742f1ab7-4758-4304-9efb-77587a15aaab	4acfca49-b1b8-4638-9f32-36cc207c7499	ebb6e3eb-f0e6-46be-aa5e-148269a2cc96	2023-08-21 20:05:00.114425
a5d70b6f-bbc2-40bc-82bf-f350bb1501a5	d6e54d20-bf48-4168-817b-e24c5e166701	ccee220c-5af2-46cc-8709-e9b7660480fd	2023-08-21 20:06:30.106152
2ef4dcd4-7f66-4067-bdce-52babdd38b57	4acfca49-b1b8-4638-9f32-36cc207c7499	6d5f619a-fa9d-4b82-badb-18c96c83f005	2023-08-24 21:49:02.298319
82d7b30f-ebc8-4bcd-9829-d94053f25765	f20d9da7-2a7a-4476-8673-2ecec6f6df00	ebb6e3eb-f0e6-46be-aa5e-148269a2cc96	2023-08-21 12:26:59.668772
8300499a-9ce0-48ce-a67c-6c844cd2b2c5	4acfca49-b1b8-4638-9f32-36cc207c7499	ccee220c-5af2-46cc-8709-e9b7660480fd	2023-08-21 20:07:58.710212
93fce50d-d9e9-4307-a178-1f6880ae5f02	9587b44f-cb87-4fb9-b099-1089271af406	6d5f619a-fa9d-4b82-badb-18c96c83f005	2023-08-24 23:24:36.34321
c1bd2ec4-6d12-457b-ac49-ad2f492d452f	8ff68f20-6601-41df-ba22-66de35129633	6d5f619a-fa9d-4b82-badb-18c96c83f005	2023-08-24 23:25:14.936458
c71ed3c0-75f7-4cdc-a822-43ce8ab19746	5f3075f2-1ae9-4c4d-bf44-184af348df06	cb07bae3-374a-4187-a451-8b6f32c1b4e8	2023-08-25 00:38:11.441212
9ecb28c1-d5f0-46b3-9051-c4d2154f57be	7873e65c-6a7c-42ee-9bb9-3e49abe4661f	60cf6cc0-ceca-4f87-817b-b706c92d60de	2023-08-23 06:50:25.00009
3d2ceea4-8af4-40fe-bdd6-b21174b0bae5	3f1e3f89-2220-491e-9c17-7f35306c92b4	60cf6cc0-ceca-4f87-817b-b706c92d60de	2023-08-23 07:21:56.268436
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: wcxfybxl
--

COPY public.posts (id, link, description, hash_tags, owner_id, created_at) FROM stdin;
3f1e3f89-2220-491e-9c17-7f35306c92b4	https://www.youtube.com/	Youtube é bom	tag3, tag4	ccee220c-5af2-46cc-8709-e9b7660480fd	2023-08-16 07:16:23.696988
63101c2b-8586-4d1c-8d3a-a31c1994bcde	https://www.twitch.tv/	Bora assitir uma live braba #live #twitch #agora	live,twitch,agora	2376bbbd-6df6-4d0d-8500-5caf55e60d1c	2023-08-21 13:33:16.103441
ec3cf91f-b79a-4900-b626-922a7d27c6ad	https://chat.openai.com/	o brabo #IA #universitários #meajuda #code	IA,universitários,meajuda,code	2376bbbd-6df6-4d0d-8500-5caf55e60d1c	2023-08-21 13:37:48.532203
cff6d831-9e13-4223-80c2-cad6d3ddfd15	https://www.globo.com/	teste #globo	globo	65926108-325e-47f1-bab7-968cc06f2b16	2023-08-17 03:08:30.50802
a825a0fe-b4bc-4c19-8597-a1f5e057ba16	https://linkr-nine-psi.vercel.app/	Nosso site	\N	2376bbbd-6df6-4d0d-8500-5caf55e60d1c	2023-08-21 13:38:32.561928
69d36e80-badb-4536-aa6f-64978a1a41c7	https://open.spotify.com/	#music #song 	music,song	2376bbbd-6df6-4d0d-8500-5caf55e60d1c	2023-08-21 13:40:11.737333
5714023a-c745-408d-8199-7fa902a327d6	http://www.google.com	Google is awesome! 	\N	fd232ad8-deaf-44d2-9bce-2793e52e5086	2023-08-18 21:04:48.444264
8bd70732-b725-4cb9-8a95-b65505159e1f	https://trello.com/	teste	 	fd232ad8-deaf-44d2-9bce-2793e52e5086	2023-08-18 23:18:50.526964
d6e54d20-bf48-4168-817b-e24c5e166701	http://google.com	teste #google	 	fd232ad8-deaf-44d2-9bce-2793e52e5086	2023-08-18 23:24:03.561685
97bf2718-1441-4dd2-ac11-6982c0af55c8	https://trello.com/	teste #teste #teste1	teste,teste1	fd232ad8-deaf-44d2-9bce-2793e52e5086	2023-08-18 23:14:57.304984
294b240a-36ea-4803-a902-ba9eb1c0e085	https://www.figma.com/	Teste #figma #ui	figma,ui	60cf6cc0-ceca-4f87-817b-b706c92d60de	2023-08-19 00:52:01.973085
067a49a5-f2fd-44ed-afac-359cbad87834	https://pt.aliexpress.com/item/1005004167900270.html	Bora da um upgrade mixuruco #pc #500pila	pc,500pila	2376bbbd-6df6-4d0d-8500-5caf55e60d1c	2023-08-21 13:41:12.369096
7c2e5b42-17d7-453a-b878-f62d804a57f5	https://linktr.ee/driveneducation_t11	mais uns links #llink	llink	2376bbbd-6df6-4d0d-8500-5caf55e60d1c	2023-08-21 13:42:51.86373
f20d9da7-2a7a-4476-8673-2ecec6f6df00	https://discord.com/	Discord é pika #dahora #curtimuito #loko #teste	dahora,curtimuito,loko,teste	ccee220c-5af2-46cc-8709-e9b7660480fd	2023-08-16 07:15:56.756606
6b7b749b-5127-4224-a2ef-36a8e21899dc	https://www.youtube.com/watch?v=IQYjoIQuQ1Q&pp=ygUQYXVyaSBzYWNyYSBmYW1lcw%3D%3D	AURI SACRA FAMES! #fomedoouro	fomedoouro	ccee220c-5af2-46cc-8709-e9b7660480fd	2023-08-19 06:11:51.34325
7873e65c-6a7c-42ee-9bb9-3e49abe4661f	https://www.youtube.com/watch?v=RYvMjm1CNuI	O SEGREDO SUJO DAS CASAS BAHIA #crimessexuaiscasasbahia	crimessexuaiscasasbahia	ccee220c-5af2-46cc-8709-e9b7660480fd	2023-08-19 21:16:04.939301
5b057d7e-44fd-4c02-8798-a0eb0ec6c6df	https://www.youtube.com/watch?v=oU1AT-H8Kbs	introdução à cloud com aws #aws #cloud @awscloud	aws,cloud	ccee220c-5af2-46cc-8709-e9b7660480fd	2023-08-19 21:48:03.106287
2a4400e5-30cc-44b9-9433-dbe355c35274	https://web.whatsapp.com/	testeeeeeeeeeeeeeeeee	\N	60cf6cc0-ceca-4f87-817b-b706c92d60de	2023-08-22 18:22:36.852518
8267dfbb-24b1-4693-8cc9-69f910ee357b	https://www.globo.com/	teste 2		fd232ad8-deaf-44d2-9bce-2793e52e5086	2023-08-18 14:17:35.883349
97189377-583d-4016-85c0-1f6a94e435d7	Bugado.jpeg	#district test driven	district	9f4b9f5c-d383-4504-926c-0126bc1f16cd	2023-08-19 22:35:32.703063
4acfca49-b1b8-4638-9f32-36cc207c7499	https://open.spotify.com/intl-pt/track/7JFGnfONNe5vepbGwZBkhL?si=31b107fa362b41fc	amo essa musica!! #musica #som #seujorge #brasil	musica,som,seujorge,brasil	83036091-84e8-4434-a6a7-0485e32c4d2b	2023-08-20 22:11:19.27376
7baf0a50-3a09-4e4f-8260-79258794a227	https://cruzeiro.com.br/	teste #teste	teste	6d5f619a-fa9d-4b82-badb-18c96c83f005	2023-08-22 19:53:41.574243
f891fc3f-306c-48ca-bf0a-7dfd8afc3f2f	https://react-icons.github.io/react-icons/	Blibioteca com icone de tudo que tu vai precisar #icons #editei #tafungando	icons,editei,tafungando	2376bbbd-6df6-4d0d-8500-5caf55e60d1c	2023-08-21 11:07:02.419568
8723094c-6c20-4542-afed-6b069340c81c	http://cruzeiro.com.br	cruzeiro #cruzeiro	cruzeiro	6d5f619a-fa9d-4b82-badb-18c96c83f005	2023-08-22 23:17:36.279627
859e75e8-2629-448b-ac3a-cea5de341e8c	http://google.com.br	google teste #teste #google	teste,google	2376bbbd-6df6-4d0d-8500-5caf55e60d1c	2023-08-22 23:18:42.826714
2d5c016d-ad0a-48b3-a7ba-c8df017452a8	http://cruzeiro.com.br	cruzeiro #cruzeiro	cruzeiro	2376bbbd-6df6-4d0d-8500-5caf55e60d1c	2023-08-22 23:19:08.033179
5d4370b4-ea4d-4d45-8340-60ce6691c80e	http://mir4.com	rpg #teste	teste	2376bbbd-6df6-4d0d-8500-5caf55e60d1c	2023-08-22 23:19:28.101242
0d41145b-3d9e-4d15-bc98-c11ff7b4f6f4	http://kabum.com.br	loja de informatica #loja	loja	2376bbbd-6df6-4d0d-8500-5caf55e60d1c	2023-08-22 23:19:43.912454
c092c2f4-3789-4714-9ee5-642ef3b7aa53	http://globo.com	teste globo #teste	teste	6d5f619a-fa9d-4b82-badb-18c96c83f005	2023-08-22 23:48:14.659107
7e358f17-557d-4ae6-92c4-1ed932371988	http://google.com.br	#testandoooooooooo	testandoooooooooo	2376bbbd-6df6-4d0d-8500-5caf55e60d1c	2023-08-24 15:13:46.489324
ed499f0b-4bac-4e20-83d5-0a2ae065deaf	https://mui.com/material-ui/react-skeleton/	Quero fazer isso aqui no site #effect #UI #bonitão #dahora #loko #teste	effect,UI,bonitão,dahora,loko,teste	60cf6cc0-ceca-4f87-817b-b706c92d60de	2023-08-20 14:13:50.861933
5f3075f2-1ae9-4c4d-bf44-184af348df06	http://www.google.com	google is @awsome	\N	f6565c2c-cc70-45e2-affe-7e2b4e5b6eaa	2023-08-23 18:49:06.326274
b4718db6-0b01-48d9-9e29-efb76252ba6b	https://www.youtube.com/watch?v=tnFABadJghM	teste: Voz: Don L Programações, synth bass e samples: Don L e Nave Teclados: Herbert Medeiros Trompete: Sidmar Vieira Arranjo de cordas e violinos: Gp  Edição/arranjo de cordas: Don L Coros: Alt Niss, Luiza de Alexandre, Terra Preta, Eddu Ferreira Autores: Don L, Nave, Gp Mix e master: Luiz Café  Direção: Aisha Mbikila Assistente de Direção: Jota Carmo  Roteiro: Aisha Mbikila, Jota Carmo Elenco: Cristina Fernandes Diretor de fotografia: Marcio Mello   Style e Figurino: ANeco Oblangata  Assistente Figurino: Israel Oliveira, Denise Saller Beauty: Gica Gomez Direção de Arte: Maíra Botelho Produção: Natália Folgosi Armas: Carrasco FX Team 1ºAc: Jonas Sossai 2º Ac/Logger: Leandro Vaz  Gaffer: Robinho Gaffer Elétrica: Deel Lucas Catering: Passa Polaca Transfer: É Noiz Na Van Montador: Fernando Freitas Faria Cor: Caio Mazzilli Direção de produção: Marina Deeh Direção de projeto: André Maleronka e Marina Deeh Caro Vapor Vidas	\N	ccee220c-5af2-46cc-8709-e9b7660480fd	2023-08-24 10:09:21.032544
82890341-b58e-428d-b3f0-541ee20bdc31	http://google.com	teste #teste	teste	6d5f619a-fa9d-4b82-badb-18c96c83f005	2023-08-24 11:55:57.46785
6662b834-56cd-45f7-957e-3cb34933316f	http://cruzeiro.com.br	#cruzeiro	cruzeiro	6d5f619a-fa9d-4b82-badb-18c96c83f005	2023-08-24 11:59:21.684106
be95fa0f-1fd4-44e3-9dfb-fccbab0b19a3	http://google.com.br	#teste	teste	6d5f619a-fa9d-4b82-badb-18c96c83f005	2023-08-24 12:58:28.798013
7b3f4268-494b-4be3-881b-68921272d3a1	http://google.com.br	getnew #teste 	teste	2376bbbd-6df6-4d0d-8500-5caf55e60d1c	2023-08-24 14:07:41.69059
96b25218-c688-49f0-b6c3-5bb3c4d5177e	https://globo.com.br	#teste #globo	teste,globo	6d5f619a-fa9d-4b82-badb-18c96c83f005	2023-08-24 14:15:10.88856
6f4bbbe0-dae6-4a5b-8669-4d29b0977b18	http://globo.com.br	#testeglobo	testeglobo	2376bbbd-6df6-4d0d-8500-5caf55e60d1c	2023-08-24 14:15:49.336629
9587b44f-cb87-4fb9-b099-1089271af406	http://cruzeiro.com.br	#testeinterval	testeinterval	2376bbbd-6df6-4d0d-8500-5caf55e60d1c	2023-08-24 15:12:17.608836
3d54642a-4719-41f8-9145-4e4d41bd525b	http://youtube.com	#testandointerval	testandointerval	2376bbbd-6df6-4d0d-8500-5caf55e60d1c	2023-08-24 16:40:17.451143
9aa09157-3382-44b1-b9d5-1d3a527899fe	http://globo.com.br	#maisumteste	maisumteste	2376bbbd-6df6-4d0d-8500-5caf55e60d1c	2023-08-24 17:02:32.576772
8d5dffba-4296-4584-8372-6b716cdc0e68	http://leagueoflegends.com	#lol	lol	2376bbbd-6df6-4d0d-8500-5caf55e60d1c	2023-08-24 17:04:50.879864
db701414-4d17-4e5f-8bd6-b71fb792bf73	http://google.com.br	cansado de tests.... #cansado	cansado	2376bbbd-6df6-4d0d-8500-5caf55e60d1c	2023-08-24 17:16:53.355223
8ff68f20-6601-41df-ba22-66de35129633	http://google.com.br	ultimo teste agora está tudo funcionando !!! #feliz	feliz	2376bbbd-6df6-4d0d-8500-5caf55e60d1c	2023-08-24 17:17:29.18724
d026bec5-0476-44d6-8846-98d03d3ef39d	http://youtube.com	#teste	teste	2376bbbd-6df6-4d0d-8500-5caf55e60d1c	2023-08-24 21:45:44.043928
145e0c06-2909-4242-aaa8-d41ebce1b9cf	http://google	\N	\N	2376bbbd-6df6-4d0d-8500-5caf55e60d1c	2023-08-24 21:46:36.067567
7ac30991-697a-4e2d-a411-c73367a85982	http://google.com	#cruzeiro	cruzeiro	2376bbbd-6df6-4d0d-8500-5caf55e60d1c	2023-08-24 21:47:08.502228
\.


--
-- Data for Name: reposts; Type: TABLE DATA; Schema: public; Owner: wcxfybxl
--

COPY public.reposts (id, references_post_id, reposted_by_id, created_at) FROM stdin;
bcfd3135-1cdb-4b52-a724-d8ed5467d87f	5b057d7e-44fd-4c02-8798-a0eb0ec6c6df	60cf6cc0-ceca-4f87-817b-b706c92d60de	2023-08-22 22:32:15.83409
769b9844-3870-4cab-91a7-53f7314cdfde	3f1e3f89-2220-491e-9c17-7f35306c92b4	60cf6cc0-ceca-4f87-817b-b706c92d60de	2023-08-22 22:35:56.333704
24e82044-05f6-47dc-8b88-bed14d5ab7ba	3f1e3f89-2220-491e-9c17-7f35306c92b4	60cf6cc0-ceca-4f87-817b-b706c92d60de	2023-08-23 01:23:02.124901
f44720e4-33aa-4b5e-9c8d-de72b5de4b14	7873e65c-6a7c-42ee-9bb9-3e49abe4661f	60cf6cc0-ceca-4f87-817b-b706c92d60de	2023-08-23 04:41:14.818574
4feedfb4-81bc-48bd-af34-6edc64805505	6b7b749b-5127-4224-a2ef-36a8e21899dc	60cf6cc0-ceca-4f87-817b-b706c92d60de	2023-08-23 07:56:15.948615
6a8133a6-c55b-4678-8d85-0e8b80c6351d	5b057d7e-44fd-4c02-8798-a0eb0ec6c6df	60cf6cc0-ceca-4f87-817b-b706c92d60de	2023-08-23 08:58:56.550368
9ff2efb2-25dc-40a6-ac82-53b109409d4d	5b057d7e-44fd-4c02-8798-a0eb0ec6c6df	60cf6cc0-ceca-4f87-817b-b706c92d60de	2023-08-23 08:59:54.01694
3f69303b-fb22-418b-bda5-03b48691b75e	f20d9da7-2a7a-4476-8673-2ecec6f6df00	60cf6cc0-ceca-4f87-817b-b706c92d60de	2023-08-23 09:00:07.717851
3404bd40-13f2-48a8-8e82-cf2679965b41	ed499f0b-4bac-4e20-83d5-0a2ae065deaf	60cf6cc0-ceca-4f87-817b-b706c92d60de	2023-08-23 09:05:44.464829
824a6497-dcda-48c1-9b97-8327fcce6fe9	2a4400e5-30cc-44b9-9433-dbe355c35274	60cf6cc0-ceca-4f87-817b-b706c92d60de	2023-08-23 09:08:37.363054
bf84a595-40b0-4f7a-a584-8339b7cd64b9	7873e65c-6a7c-42ee-9bb9-3e49abe4661f	60cf6cc0-ceca-4f87-817b-b706c92d60de	2023-08-23 09:10:08.52106
090cce85-b68e-440a-a509-a179cb72af57	0d41145b-3d9e-4d15-bc98-c11ff7b4f6f4	6d5f619a-fa9d-4b82-badb-18c96c83f005	2023-08-23 14:24:54.992576
a26c9317-4248-4861-843b-eff16958307f	ed499f0b-4bac-4e20-83d5-0a2ae065deaf	60cf6cc0-ceca-4f87-817b-b706c92d60de	2023-08-23 21:57:16.721237
80b6d15c-c3d2-4350-b45e-26574ad5090b	ed499f0b-4bac-4e20-83d5-0a2ae065deaf	60cf6cc0-ceca-4f87-817b-b706c92d60de	2023-08-23 21:57:21.334048
b94af73e-318e-44bc-8d37-d0c53e391d08	5f3075f2-1ae9-4c4d-bf44-184af348df06	60cf6cc0-ceca-4f87-817b-b706c92d60de	2023-08-24 00:28:31.613724
e8059ab7-9321-46f9-a7b9-14d35115b3b1	0d41145b-3d9e-4d15-bc98-c11ff7b4f6f4	6d5f619a-fa9d-4b82-badb-18c96c83f005	2023-08-24 00:30:04.252936
9ae14217-6654-49ff-b268-d0690018cd7c	5d4370b4-ea4d-4d45-8340-60ce6691c80e	6d5f619a-fa9d-4b82-badb-18c96c83f005	2023-08-24 00:32:25.751472
9fe24fe4-f89e-4aef-8962-7ada1b567935	0d41145b-3d9e-4d15-bc98-c11ff7b4f6f4	6d5f619a-fa9d-4b82-badb-18c96c83f005	2023-08-24 00:32:30.46975
63e3c2c4-f3a8-4279-bd9d-1d6ac728a9f5	5d4370b4-ea4d-4d45-8340-60ce6691c80e	6d5f619a-fa9d-4b82-badb-18c96c83f005	2023-08-24 00:32:34.292263
70a58b03-9790-4606-b83c-0bfa5a37e529	0d41145b-3d9e-4d15-bc98-c11ff7b4f6f4	6d5f619a-fa9d-4b82-badb-18c96c83f005	2023-08-24 00:32:37.514294
3ddccd25-72c0-4cac-91ec-53a19c5ffc1c	0d41145b-3d9e-4d15-bc98-c11ff7b4f6f4	6d5f619a-fa9d-4b82-badb-18c96c83f005	2023-08-24 00:32:40.362086
67852774-ecae-49f9-8f09-70be66972941	0d41145b-3d9e-4d15-bc98-c11ff7b4f6f4	6d5f619a-fa9d-4b82-badb-18c96c83f005	2023-08-24 00:32:46.21823
9c052494-4d6a-4479-92f3-84ba48439a55	0d41145b-3d9e-4d15-bc98-c11ff7b4f6f4	6d5f619a-fa9d-4b82-badb-18c96c83f005	2023-08-24 00:32:49.258662
f5959932-c5f9-42e6-8ebf-1c530edcf079	0d41145b-3d9e-4d15-bc98-c11ff7b4f6f4	6d5f619a-fa9d-4b82-badb-18c96c83f005	2023-08-24 00:32:52.28016
1d3529b5-afac-47e1-8b54-7ba25fbe9a47	ed499f0b-4bac-4e20-83d5-0a2ae065deaf	60cf6cc0-ceca-4f87-817b-b706c92d60de	2023-08-24 01:25:37.063824
17213ad8-5000-4a75-8fef-c817070a4417	7ac30991-697a-4e2d-a411-c73367a85982	6d5f619a-fa9d-4b82-badb-18c96c83f005	2023-08-24 21:47:50.325507
a4fc3ca9-89e4-48f7-8702-2288e0cdfd03	4acfca49-b1b8-4638-9f32-36cc207c7499	6d5f619a-fa9d-4b82-badb-18c96c83f005	2023-08-24 21:49:05.664315
e3578287-564c-40e7-94af-b208f0491414	8ff68f20-6601-41df-ba22-66de35129633	2376bbbd-6df6-4d0d-8500-5caf55e60d1c	2023-08-24 21:55:00.395953
433c1f1b-5541-4a79-aff3-d5a07d6d3070	7ac30991-697a-4e2d-a411-c73367a85982	2376bbbd-6df6-4d0d-8500-5caf55e60d1c	2023-08-24 21:55:12.437624
c587dbfe-cb2f-482b-bcee-730c9e74ee07	8ff68f20-6601-41df-ba22-66de35129633	6d5f619a-fa9d-4b82-badb-18c96c83f005	2023-08-24 23:24:10.150315
66a818fe-ed51-41c9-81c2-e01c3dca606f	7ac30991-697a-4e2d-a411-c73367a85982	6d5f619a-fa9d-4b82-badb-18c96c83f005	2023-08-25 00:00:23.444315
cf535c68-d8b4-42ac-baea-4a8ee6d35e01	ed499f0b-4bac-4e20-83d5-0a2ae065deaf	60cf6cc0-ceca-4f87-817b-b706c92d60de	2023-08-25 04:01:40.745319
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: wcxfybxl
--

COPY public.users (id, email, user_name, password, photo) FROM stdin;
ebb6e3eb-f0e6-46be-aa5e-148269a2cc96	donl@mail.com	Don L	$2b$10$.vybzrCBlV1AkmtOzSbXOefq6kOrSD0WlcVJGBacH6r7dQgJuKNZm	https://www.vagalume.com.br/don-l/images/don-l.jpg
ccee220c-5af2-46cc-8709-e9b7660480fd	test@mail.com	test	$2b$10$q8/tyy/DsRFYAsXFpisrFu.RyaDi1gK2RC23wiO0QUpLPzgTRVnZm	https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png
6d5f619a-fa9d-4b82-badb-18c96c83f005	gui@gmail.com	gui	$2b$10$UNPD.35w7xchBeAs9O2hJeZ8SfiQOVxsMA2MpA0RsnonR.MEUJ1Y.	https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Cruzeiro_Esporte_Clube_%28logo%29.svg/1200px-Cruzeiro_Esporte_Clube_%28logo%29.svg.png
a6df4d68-4959-4ed0-bde0-631b1713a804	lucas@andrade.com	WbGeDoN	$2b$10$fdSLakhm/uROF0oLNIh87.WEVdDN7dGglLdb7i6cPPDwyoDSUp3XC	https://perfectworld.com.br/img/o-jogo/classes/classe_barbaro_thumb.png
65926108-325e-47f1-bab7-968cc06f2b16	teste1@mail.com	teste	$2b$10$y5yzKY98uJxoqsnhYEMeCuwnaUJAhNFyMLejN4dZx1JLc5x.fdoRG	https://parspng.com/wp-content/uploads/2022/07/tickpng.parspng.com-5.png
f6565c2c-cc70-45e2-affe-7e2b4e5b6eaa	teste@mail.com	teste	$2b$10$pVfRfhtQFm4cMp.FsAi9POXYoZDrCEXoOFVvnpnLfKP95aDI95x8i	https://i.pinimg.com/474x/65/82/a8/6582a801819115700f246e35dc4338df.jpg
fd232ad8-deaf-44d2-9bce-2793e52e5086	mail@mail.com	mail	$2b$10$Frv9zUfl1bDVWG6ViIn/QeMAmI0Fe32fWpso1kDZir/hphaQoeAE6	https://www.google.com.br/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Fbr%2Ficone-gratis%2Fperfil_3135768&psig=AOvVaw3ITtFFwc_e5xb8iO-uEK0T&ust=1692410312002000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCLjZzu2N5YADFQAAAAAdAAAAABAE
840c2a27-2098-4032-bf55-c8893dd41b6e	matheus@gmail.com	jobs	$2b$10$uu7DUqDjyru3I1eGvbko7e0nAEcjm05mzMSHFZLiRRSoeFYRdb206	data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFRgVFRUZFhYaGRgYFRgaGBIYGBgSGBgZGRgYGBgcIS4lHB4rHxgYJjgmKy8xNTU1GiQ7QDszPy40NTEBDAwMEA8QGhISHjEhGCExNDQxMTQ0NDQ0NDQ0NDExNDE0NDE0NDQ0NDExNDQ/MTQ0Pz8xMTE0NDE/MTExMTE0Mf/AABEIAKgBLAMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAADBAIFAAEGB//EADsQAAEDAgQEAwcEAgAFBQAAAAEAAhEDIQQSMUEFUWFxgZGhExQiMrHB8AZC0eFS8RVDYpLyFiNygqL/xAAZAQADAQEBAAAAAAAAAAAAAAAAAQIDBAX/xAAkEQEBAQEAAgICAgIDAAAAAAAAAQIREiEDMUFRBBNxgSIyYf/aAAwDAQACEQMRAD8AGaSm0KQcpEJ9IPIttZdSKlTQDFMrZcoBq3lQE23WxTUW2Us6AI1SLVBj1svSDTmqKkShuVBhCi5i04rC9AMYVqVxeFmpIFntP/cI/r1UffNcuo1HTn2UsHjnOcWlsOHynqdvP6pypuSBwrnOhw+EiOxmR6pLGcMfkBymxcw67GR4XK7ygGuFxE6iNCrBlEGxAO+i08nNr+NNPK24YtmRpM+VlCjRm69RxPB6bwRliRB9FzGK/TT2vcG/LqPMommO/wCNZzjm3shLOZKscdhXsJDhBB9Ck2iEM9Z4mxllB9OURqsMNgS4iyX0vOe/ROjhOiM7CldNheECBJTjeEtS8o3z8V44V+FcE3QwpgWXaHhDLSEZvDmf4oVPhriWYQzYJh+FLRcdAuyo4Jg0AWq3DmvfJ20COq/qscd7rZBqUfJdrieFNIACTqcGMWT6V+PrjHYckoT6BGi6t3BnDbxSOIwZBiE/JH9NVocSxEwrfgWy3Vo8VrBmxCm3tbYz4zi64SA05inKmIvqqr2gDdUH3oc1rnXInWbaC
60cf6cc0-ceca-4f87-817b-b706c92d60de	darlanswtz@gmail.com	Darlan	$2b$10$1k.SguNr1Vw5.kg0sySR/OAYWqwDoDyoalZm0jSq0XWznTRqkRNfm	https://www.tvinsider.com/wp-content/uploads/2023/03/beavis-and-butt-head-1014x570.jpg
2c5106a3-638d-4930-b41d-c3fb441a2fbe	daviderthal06@gmail.com	daviderthal-;-	$2b$10$bhzAHuctJ7MxG74Fvtuqs.Ckck1e91KorGXVyYzTivYl9S/13IydO	https://nanu.blog.br/wp-content/uploads/2017/09/Hewl-Tanky.jpg
9f4b9f5c-d383-4504-926c-0126bc1f16cd	whoami@mail.com	123	$2b$10$7NR8cbr5yY6Rke.KLcOQv.hUK/WMhEeZ7fBxKi8Rmd5B9OsP8u5/S	data:image/jpeg;base64,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
54818aac-1905-463f-8bf2-d40ec3a988ca	lelzin.cas@gmail.com	Akorabe	$2b$10$iSlxE5hIUds9dpPZCqrrIunXNsdkE0gn5yRfuON2.MBcJsYPKMDtK	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYWW0RHbXL-ObHdM0LHAjErbFJ5P_XHm-i-A&usqp=CAU
83036091-84e8-4434-a6a7-0485e32c4d2b	bia@gmail.com	paciullobia	$2b$10$Oq0mjY1ih69JneE0ffAAl.5UkCJnF.CvVwEGWS3.AVYDXFpZRosY6	https://thumb.mytentacle.com.br/O2ykLIdWMlVZryE87x9S3UmqaxM=/fit-in/300x200/filters:format(webp)/https://udi-s.sfo3.cdn.digitaloceanspaces.com/question_option/cover/2021/11/13/7.4.jpg
2376bbbd-6df6-4d0d-8500-5caf55e60d1c	fudencio@gmail.com	Gaudêncio	$2b$10$q4A25AEPxQiV830pjRqZG.4Hf4fXrEBhKQAfrLSwrCZS50HFlmKiO	https://www.sesc-rs.com.br/wp-content/uploads/2019/03/Gaudencio.jpg
cb07bae3-374a-4187-a451-8b6f32c1b4e8	new_teste@mail.com	new_teste	$2b$10$Ww4RbyTsM9O0HzvKgW6ko.halG6iusGK03j/KjromLv3fJkre9gsS	data:image/jpeg;base64,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
\.


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: wcxfybxl
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: followers followers_pkey; Type: CONSTRAINT; Schema: public; Owner: wcxfybxl
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT followers_pkey PRIMARY KEY (id);


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
-- Name: reposts reposts_pkey; Type: CONSTRAINT; Schema: public; Owner: wcxfybxl
--

ALTER TABLE ONLY public.reposts
    ADD CONSTRAINT reposts_pkey PRIMARY KEY (id);


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
-- Name: followers followers_follower_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wcxfybxl
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT followers_follower_fkey FOREIGN KEY (follower) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: followers followers_following_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wcxfybxl
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT followers_following_fkey FOREIGN KEY (following) REFERENCES public.users(id) ON DELETE CASCADE;


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
-- Name: reposts reposted_by_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wcxfybxl
--

ALTER TABLE ONLY public.reposts
    ADD CONSTRAINT reposted_by_id_fkey FOREIGN KEY (reposted_by_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: reposts reposts_references_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wcxfybxl
--

ALTER TABLE ONLY public.reposts
    ADD CONSTRAINT reposts_references_post_id_fkey FOREIGN KEY (references_post_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

