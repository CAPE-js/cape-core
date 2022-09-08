#!/usr/bin/perl

use FindBin;
use JSON::PP;

use strict;
use warnings;

my $BASE_DIR = "$FindBin::Bin";
my $WORK_DIR = "/tmp/cape-dist.$$";
my $REPO_URL = "git\@github.com:CAPE-js/cape-dist.git";

my $PACKAGE_FILE = "$WORK_DIR/package.json";
my $DIST_DIR = "$BASE_DIR/dist";

# checkout from git into a temporary location
run_cmd( "git", "clone", $REPO_URL, $WORK_DIR );

# build the production distribution
run_cmd( "cd", $BASE_DIR );
run_cmd( "npm", "run", "build" );

# copy the dist files over those in the dist repository
run_cmd( "cp $DIST_DIR/* $WORK_DIR" ); # done without an array to allow glob

run_cmd( "cd", $WORK_DIR );

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

# update git
run_cmd( "git", "commit", "-a", "-mVersion $newv" );
run_cmd( "git", "push" );

# Publish to NPM
run_cmd( "npm", "publish" );

# Clean up
run_cmd( "rm", "-rf", $WORK_DIR );

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
