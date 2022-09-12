#!/usr/bin/perl

# Running this script will create a new NPM cape distribution from the main branch of cape-core. It commits the changes to the cape-dist repository.

# It checks it out from github so make sure you've done a git commit and a git push first.

use FindBin;
use JSON::PP;

use strict;
use warnings;

# debugging options
my $WRITE = 1; # if false, this won't push git or npm changes
my $CLEAN = 1; # if false, this won't clean up the work directory

my $BASE_DIR = "$FindBin::Bin";
my $WORK_DIR = "/tmp/cape-build.$$";
my $DIST_REPO_URL = "git\@github.com:CAPE-js/cape-dist.git";
my $CORE_REPO_URL = "git\@github.com:CAPE-js/cape-core.git";

my $CORE_REPO_DIR = "$WORK_DIR/core";
my $DIST_REPO_DIR = "$WORK_DIR/dist";
my $DIST_BUILD_DIR = "$CORE_REPO_DIR/dist";

my $PACKAGE_FILE = "$DIST_REPO_DIR/package.json";

# create temporary dir
mkdir( $WORK_DIR ) || die "Failed to mkdir $WORK_DIR: $!";

# checkout from git into a temporary location
run_cmd( "git", "clone", $CORE_REPO_URL, $CORE_REPO_DIR );
run_cmd( "git", "clone", $DIST_REPO_URL, $DIST_REPO_DIR );

# build the production distribution
chdir( $CORE_REPO_DIR );
run_cmd( "npm", "install" );
run_cmd( "npm", "run", "build" );

# copy the dist files over those in the dist repository
run_cmd( "cp $DIST_BUILD_DIR/* $DIST_REPO_DIR" ); # done without an array to allow glob

# get package.json
my $fh;
open( $fh, "<:utf8", $PACKAGE_FILE ) || die "cannot read $PACKAGE_FILE: $!";
my $raw = join("",<$fh>);
close($fh);
my $j = decode_json($raw);

# get version
my $v = $j->{version};
print "OLD VERSION: $v\n";

# increment minor version
my @vparts = split( /\./, $v );
$vparts[2]++;
my $newv = join( ".", @vparts );
print "NEW VERSION: $newv\n";

# update package.json
$j->{version} = $newv;
open( $fh, ">:utf8", $PACKAGE_FILE ) || die "cannot write $PACKAGE_FILE: $!";
print {$fh} encode_json($j);
close($fh);

if( $WRITE ) {
	# update git
	chdir( $DIST_REPO_DIR );
	run_cmd( "git", "commit", "-a", "-mVersion $newv" );
	run_cmd( "git", "push" );
	
	# Publish to NPM
	run_cmd( "npm", "publish" );
}

if( $CLEAN ) {
	# Clean up
	run_cmd( "rm", "-rf", $WORK_DIR );
}

exit(0);

sub run_cmd {
	my( @cmd ) = @_;

	print "% ".join(" ",@cmd)."\n";
	my $rc = system( @cmd );
	if( $rc != 0 ) {
		print STDERR "Command failed with code $rc: $?\n";
		exit(1);
	}
}
