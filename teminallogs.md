studio-7615446040:~/studio{master}$ mkdir -p ~/.postgres/bobby_vision_test_data
studio-7615446040:~/studio{master}$ export PGDATA=~/.postgres/bobby_vision_test_data
studio-7615446040:~/studio{master}$ initdb
The files belonging to this database system will be owned by user "user".
This user must also own the server process.

The database cluster will be initialized with this locale configuration:
  locale provider:   libc
  LC_COLLATE:  en_US.UTF-8
  LC_CTYPE:    C.UTF-8
  LC_MESSAGES: en_US.UTF-8
  LC_MONETARY: en_US.UTF-8
  LC_NUMERIC:  en_US.UTF-8
  LC_TIME:     en_US.UTF-8
The default database encoding has accordingly been set to "UTF8".
The default text search configuration will be set to "english".

Data page checksums are disabled.

fixing permissions on existing directory /home/user/.postgres/bobby_vision_test_data ... ok
creating subdirectories ... ok
selecting dynamic shared memory implementation ... posix
selecting default "max_connections" ... 100
selecting default "shared_buffers" ... 128MB
selecting default time zone ... Etc/UTC
creating configuration files ... ok
running bootstrap script ... ok
performing post-bootstrap initialization ... ok
syncing data to disk ... ok

initdb: warning: enabling "trust" authentication for local connections
initdb: hint: You can change this by editing pg_hba.conf or using the option -A, or --auth-local and --auth-host, the next time you run initdb.

Success. You can now start the database server using:

    /usr/bin/pg_ctl -D /home/user/.postgres/bobby_vision_test_data -l logfile start

studio-7615446040:~/studio{master}$ pg_ctl -D $PGDATA -l logfile start
waiting for server to start.... stopped waiting
pg_ctl: could not start server
Examine the log output.
studio-7615446040:~/studio{master}$ /usr/bin/pg_ctl -D /home/user/.postgres/bobby_vision_test_data -l logfile start
waiting for server to start.... stopped waiting
pg_ctl: could not start server
Examine the log output.
studio-7615446040:~/studio{master}$ echo $pgdaa

studio-7615446040:~/studio{master}$ echo $pgdata

studio-7615446040:~/studio{master}$ echo $PGDATA
/home/user/.postgres/bobby_vision_test_data
studio-7615446040:~/studio{master}$ sudo mkdir -p /run/postgresql
sudo is not installed, but available in the following packages, pick one to run it, Ctrl+C to cancel.
this path will be fetched (1.29 MiB download, 6.07 MiB unpacked):
  /nix/store/4hgmf1xkjp06x3xcv66389fq27nnkv5r-sudo-1.9.16p2
copying path '/nix/store/4hgmf1xkjp06x3xcv66389fq27nnkv5r-sudo-1.9.16p2' from 'https://cache.nixos.org' to 'local-overlay://'...
sudo: /nix/store/4hgmf1xkjp06x3xcv66389fq27nnkv5r-sudo-1.9.16p2/bin/sudo must be owned by uid 0 and have the setuid bit set
To permanently add this package to your environment, please add pkgs.sudo to the list of packages in your dev.nix file, then rebuild your environment
studio-7615446040:~/studio{master}$ sudo mkdir -p /run/postgresql
sudo is not installed, but available in the following packages, pick one to run it, Ctrl+C to cancel.
studio-7615446040:~/studio{master}$ mkdir -p /run/postgresql
studio-7615446040:~/studio{master}$ chown postgres:postgres /run/postgresql
chown: invalid user: ‘postgres:postgres’
studio-7615446040:~/studio{master}$ postgres:
bash: postgres:: command not found
studio-7615446040:~/studio{master}$ postgres --help
postgres is the PostgreSQL server.

Usage:
  postgres [OPTION]...

Options:
  -B NBUFFERS        number of shared buffers
  -c NAME=VALUE      set run-time parameter
  -C NAME            print value of run-time parameter, then exit
  -d 1-5             debugging level
  -D DATADIR         database directory
  -e                 use European date input format (DMY)
  -F                 turn fsync off
  -h HOSTNAME        host name or IP address to listen on
  -i                 enable TCP/IP connections (deprecated)
  -k DIRECTORY       Unix-domain socket location
  -l                 enable SSL connections
  -N MAX-CONNECT     maximum number of allowed connections
  -p PORT            port number to listen on
  -s                 show statistics after each query
  -S WORK-MEM        set amount of memory for sorts (in kB)
  -V, --version      output version information, then exit
  --NAME=VALUE       set run-time parameter
  --describe-config  describe configuration parameters, then exit
  -?, --help         show this help, then exit

Developer options:
  -f s|i|o|b|t|n|m|h forbid use of some plan types
  -O                 allow system table structure changes
  -P                 disable system indexes
  -t pa|pl|ex        show timings after each query
  -T                 send SIGABRT to all backend processes if one dies
  -W NUM             wait NUM seconds to allow attach from a debugger

Options for single-user mode:
  --single           selects single-user mode (must be first argument)
  DBNAME             database name (defaults to user name)
  -d 0-5             override debugging level
  -E                 echo statement before execution
  -j                 do not use newline as interactive query delimiter
  -r FILENAME        send stdout and stderr to given file

Options for bootstrapping mode:
  --boot             selects bootstrapping mode (must be first argument)
  --check            selects check mode (must be first argument)
  DBNAME             database name (mandatory argument in bootstrapping mode)
  -r FILENAME        send stdout and stderr to given file

Please read the documentation for the complete list of run-time
configuration settings and how to set them on the command line or in
the configuration file.

Report bugs to <pgsql-bugs@lists.postgresql.org>.
PostgreSQL home page: <https://www.postgresql.org/>
studio-7615446040:~/studio{master}$ whosmi

bash: whosmi: command not found
studio-7615446040:~/studio{master}$ 
studio-7615446040:~/studio{master}$ whoami
user
studio-7615446040:~/studio{master}$ info
info is not installed, but available in the following packages, pick one to run it, Ctrl+C to cancel.
studio-7615446040:~/studio{master}$ sysinfo
sysinfo is not installed, but available in the following packages, pick one to run it, Ctrl+C to cancel.
studio-7615446040:~/studio{master}$ postgres
2025-07-16 01:24:00.655 UTC [4277] LOG:  starting PostgreSQL 17.5 on x86_64-pc-linux-gnu, compiled by gcc (GCC) 13.3.0, 64-bit
2025-07-16 01:24:00.655 UTC [4277] LOG:  listening on IPv4 address "127.0.0.1", port 5432
2025-07-16 01:24:00.659 UTC [4277] LOG:  listening on Unix socket "/run/postgresql/.s.PGSQL.5432"
2025-07-16 01:24:00.669 UTC [4280] LOG:  database system was shut down at 2025-07-16 01:16:10 UTC
2025-07-16 01:24:00.678 UTC [4277] LOG:  database system is ready to accept connections
2025-07-16 01:24:02.883 UTC [4320] LOG:  invalid length of startup packet
^C2025-07-16 01:25:38.488 UTC [4277] LOG:  received fast shutdown request
2025-07-16 01:25:38.492 UTC [4277] LOG:  aborting any active transactions
2025-07-16 01:25:38.501 UTC [4277] LOG:  background worker "logical replication launcher" (PID 4283) exited with exit code 1
2025-07-16 01:25:38.502 UTC [4278] LOG:  shutting down
2025-07-16 01:25:38.505 UTC [4278] LOG:  checkpoint starting: shutdown immediate
2025-07-16 01:25:38.531 UTC [4278] LOG:  checkpoint complete: wrote 38 buffers (0.2%); 0 WAL file(s) added, 0 removed, 0 recycled; write=0.010 s, sync=0.006 s, total=0.030 s; sync files=11, longest=0.003 s, average=0.001 s; distance=198 kB, estimate=198 kB; lsn=0/157CBB8, redo lsn=0/157CBB8
2025-07-16 01:25:38.537 UTC [4277] LOG:  database system is shut down
studio-7615446040:~/studio{master}$ pg_ctl -D $PGDATA stop
pg_ctl: PID file "/home/user/.postgres/bobby_vision_test_data/postmaster.pid" does not exist
Is server running?
studio-7615446040:~/studio{master}$ ls $PGDATA
base    pg_commit_ts  pg_hba.conf    pg_logical    pg_notify    pg_serial     pg_stat      pg_subtrans  pg_twophase  pg_wal   postgresql.auto.conf  postmaster.opts
global  pg_dynshmem   pg_ident.conf  pg_multixact  pg_replslot  pg_snapshots  pg_stat_tmp  pg_tblspc    PG_VERSION   pg_xact  postgresql.conf
studio-7615446040:~/studio{master}$ echo $PGDATA
/home/user/.postgres/bobby_vision_test_data
studio-7615446040:~/studio{master}$ 